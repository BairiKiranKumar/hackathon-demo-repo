#!/usr/bin/env python3
"""
Dependency Sync Advisor
Diffs dependency/config files in a PR and uses Groq (free) to suggest
exact commands the developer needs to run to sync changes locally.
"""

import os
import sys
import json
import fnmatch
import subprocess
import urllib.request
import urllib.error

# ─── Config ───────────────────────────────────────────────────────────────────

# Exact filenames to watch (matched against full relative path OR basename).
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
    "MIGRATION_NOTES.md",
    # Native / system
    "apt-requirements.txt",
    "brew-requirements.txt",
]

# Glob patterns matched against the FILENAME (basename) of any changed file.
# This catches files anywhere in the repo — e.g. api/src/graphql/events.sdl.ts
# matches "*.sdl.ts", and api/db/schema.prisma matches "schema.prisma".
DEP_PATTERNS = [
    "*.sdl.ts",       # GraphQL SDL files (RedwoodJS / any GraphQL stack)
    "*.prisma",       # Prisma schema files (schema.prisma, any location)
    "*.graphql",      # Plain .graphql schema files
    "*.gql",          # Alternate GraphQL extension
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
    """Return {filepath: diff_text} for every watched file that changed.

    Strategy:
    1. Use `git diff --name-only` to get ALL files changed in this PR.
    2. Match each changed file against DEP_FILES (exact) and DEP_PATTERNS (glob on basename).
    3. Fetch the actual diff only for matched files.

    This handles files nested anywhere in the repo (e.g. api/db/schema.prisma,
    api/src/graphql/events.sdl.ts) without hardcoding their paths.
    """
    # Step 1: all files changed between base and head
    all_changed = run(["git", "diff", "--name-only", base, head]).splitlines()

    # Step 2: match against exact list and glob patterns
    matched: set[str] = set()
    for filepath in all_changed:
        basename = os.path.basename(filepath)
        # Exact match — full path or just filename
        if filepath in DEP_FILES or basename in DEP_FILES:
            matched.add(filepath)
            continue
        # Glob pattern match on basename (catches nested files)
        for pattern in DEP_PATTERNS:
            if fnmatch.fnmatch(basename, pattern):
                matched.add(filepath)
                break

    # Step 3: fetch diffs for matched files only
    diffs: dict[str, str] = {}
    for f in sorted(matched):
        diff = run(["git", "diff", base, head, "--", f])
        if diff:
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
- If only lock file internals changed (no new packages), say "run install to sync lock file — no new packages added"
- If a Prisma schema file (*.prisma) changed:
  - If new models, fields, or relations were added/modified, include the migrate command with a ⚠️ warning (e.g. `yarn rw prisma migrate dev` or `npx prisma migrate dev`)
  - Always follow the migration with the type-generation command (e.g. `yarn rw g types` or `npx prisma generate`)
- If a GraphQL SDL file (*.sdl.ts, *.graphql, *.gql) changed:
  - Include the type-generation command so TypeScript types stay in sync (e.g. `yarn rw g types`)
  - If the SDL adds a new resolver or service, note that the developer may need to pull updated service files too
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
            "Content-Type": "application/json",
            "User-Agent": "dep-sync-advisor/1.0"  # Required: Cloudflare blocks urllib without User-Agent (error 1010)
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
        url = f"https://api.github.com/repos/{repo}/issues/comments/{existing['id']}"
        method = "PATCH"
        print(f"Updating existing advisor comment #{existing['id']}")
    else:
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