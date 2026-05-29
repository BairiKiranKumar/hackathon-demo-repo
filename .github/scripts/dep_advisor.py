#!/usr/bin/env python3
"""
Dependency Sync Advisor
Diffs dependency/config files in a PR and uses Groq (free) to suggest
exact commands the developer needs to run to sync changes locally.
"""

import os
import sys
import json
import subprocess
import urllib.request
import urllib.error
import hashlib

# ─── Config ───────────────────────────────────────────────────────────────────

# Files to watch. Add/remove based on your stack.
DEP_FILES = [
    # JS/TS
    "package.json",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    ".nvmrc",
    ".node-version",
    # Python
    "requirements.txt",
    "requirements-dev.txt",
    "Pipfile",
    "Pipfile.lock",
    "pyproject.toml",
    "poetry.lock",
    "setup.py",
    "setup.cfg",
    # Ruby
    "Gemfile",
    "Gemfile.lock",
    # Dart/Flutter
    "pubspec.yaml",
    "pubspec.lock",
    # Java/Kotlin
    "build.gradle",
    "build.gradle.kts",
    "pom.xml",
    "gradle.properties",
    # Docker / infra
    "Dockerfile",
    "docker-compose.yml",
    "docker-compose.yaml",
    "docker-compose.override.yml",
    # Environment / config
    ".env.example",
    ".env.sample",
    ".env.template",
    # DB / migrations
    "alembic.ini",
    "MIGRATION_NOTES.md",   # ask backend devs to drop notes here
    # Native / system
    "apt-requirements.txt", # custom: list apt packages
    "brew-requirements.txt",# custom: list brew packages
]

# Groq model — llama-3.3-70b-versatile is free and handles this easily
GROQ_MODEL = "llama-3.3-70b-versatile"

# Max diff chars per file sent to the LLM (lock files get huge — trim them)
MAX_DIFF_CHARS = 6000

# ─── Helpers ──────────────────────────────────────────────────────────────────

def run(cmd: list[str]) -> str:
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.stdout.strip()


def get_changed_files(base: str, head: str) -> dict[str, str]:
    """Return {filename: diff_text} for every watched file that changed."""
    diffs = {}
    for f in DEP_FILES:
        diff = run(["git", "diff", base, head, "--", f])
        if diff:
            # Trim very large diffs (lock files) so we stay within token limits
            if len(diff) > MAX_DIFF_CHARS:
                diff = diff[:MAX_DIFF_CHARS] + f"\n\n... [truncated — {len(diff)} chars total]"
            diffs[f] = diff
    return diffs


def build_prompt(diffs: dict[str, str], stack_hint: str) -> str:
    diff_text = "\n\n".join(
        f"### {fname}\n```diff\n{content}\n```"
        for fname, content in diffs.items()
    )

    stack_line = f"Stack context: {stack_hint}" if stack_hint else ""

    return f"""You are a senior full-stack developer helping a frontend developer sync their local environment after pulling changes from a backend developer's branch.

{stack_line}

The following dependency and configuration files changed in this pull request.
Your job is to output the EXACT terminal commands the developer needs to run locally, in order, to sync these changes.

Important rules:
- Group commands by file/concern with a short heading
- If a native system package is needed (e.g. via apt, brew, or similar), include the install command and explain why briefly
- If a database migration needs to run, include that command with a ⚠️ warning to back up data first
- If an environment variable was added to .env.example, flag it clearly so the developer adds it to their .env
- If only lock file internals changed (no new packages), say "run npm install / pip install to sync lock file — no new packages added"
- Be concise. No long explanations unless a command is risky.
- Do NOT suggest commands for files that didn't change.
- If you're unsure about something, say so briefly rather than guessing.

Changed files:

{diff_text}
"""


def call_groq(prompt: str, api_key: str) -> str:
    """Call Groq API with llama-3.3-70b-versatile."""
    payload = json.dumps({
        "model": GROQ_MODEL,
        "max_tokens": 1024,
        "messages": [
            {
                "role": "system",
                "content": "You are a concise, accurate developer assistant. Output only what is asked — no preamble, no sign-off."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    }).encode()

    req = urllib.request.Request(
        "https://api.groq.com/openai/v1/chat/completions",
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    )

    try:
        resp = json.loads(urllib.request.urlopen(req).read())
        return resp["choices"][0]["message"]["content"].strip()
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"Groq API error {e.code}: {body}", file=sys.stderr)
        sys.exit(1)


def get_existing_advisor_comment(repo: str, pr: str, token: str) -> dict | None:
    """Return the existing advisor comment if one exists, else None."""
    req = urllib.request.Request(
        f"https://api.github.com/repos/{repo}/issues/{pr}/comments?per_page=100",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json"
        }
    )
    comments = json.loads(urllib.request.urlopen(req).read())
    for c in comments:
        if "<!-- dep-sync-advisor -->" in c["body"]:
            return c
    return None


def post_or_update_comment(repo: str, pr: str, token: str, body: str):
    """Post a new comment or update the existing one (avoids spam on re-runs)."""
    existing = get_existing_advisor_comment(repo, pr, token)

    if existing:
        # PATCH = update existing comment
        url = f"https://api.github.com/repos/{repo}/issues/comments/{existing['id']}"
        method = "PATCH"
        print(f"Updating existing advisor comment #{existing['id']}")
    else:
        # POST = new comment
        url = f"https://api.github.com/repos/{repo}/issues/{pr}/comments"
        method = "POST"
        print("Posting new advisor comment")

    req = urllib.request.Request(
        url,
        data=json.dumps({"body": body}).encode(),
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json"
        },
        method=method
    )
    urllib.request.urlopen(req)


def build_comment(suggestion: str, changed_files: list[str]) -> str:
    files_list = "\n".join(f"- `{f}`" for f in changed_files)
    return f"""<!-- dep-sync-advisor -->
## 🔄 Dependency sync advisor

**Changed files detected:**
{files_list}

---

### Commands to run after pulling this branch

{suggestion}

---
<sup>Powered by Groq · llama-3.3-70b-versatile · Review all commands before running</sup>
"""


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    # Read env
    api_key   = os.environ.get("GROQ_API_KEY", "").strip()
    token     = os.environ.get("GITHUB_TOKEN", "").strip()
    base_sha  = os.environ.get("BASE_SHA", "").strip()
    head_sha  = os.environ.get("HEAD_SHA", "").strip()
    pr_number = os.environ.get("PR_NUMBER", "").strip()
    repo      = os.environ.get("REPO", "").strip()
    stack     = os.environ.get("STACK_HINT", "").strip()

    if not api_key:
        print("GROQ_API_KEY not set — skipping advisor.", file=sys.stderr)
        sys.exit(0)

    # 1. Get diffs
    print(f"Diffing {base_sha[:8]}..{head_sha[:8]}")
    diffs = get_changed_files(base_sha, head_sha)

    if not diffs:
        print("No dependency file changes detected — nothing to advise.")
        # Optionally: remove old comment if it exists from a previous push
        sys.exit(0)

    print(f"Changed dep files: {list(diffs.keys())}")

    # 2. Build prompt and call Groq
    prompt = build_prompt(diffs, stack)
    print("Calling Groq API...")
    suggestion = call_groq(prompt, api_key)
    print("Got suggestion from Groq.")

    # 3. Post/update PR comment
    comment_body = build_comment(suggestion, list(diffs.keys()))
    post_or_update_comment(repo, pr_number, token, comment_body)
    print("Done.")


if __name__ == "__main__":
    main()