/*
  Warnings:

  - You are about to drop the column `currentScore` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `pastScore` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `pastScoreDate` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Member` table. All the data in the column will be lost.
  - The `languageSkills` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "LanguageSkill" AS ENUM ('SPEAK', 'READ', 'WRITE');

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "currentScore",
DROP COLUMN "pastScore",
DROP COLUMN "pastScoreDate",
DROP COLUMN "status",
ADD COLUMN     "insightId" INTEGER,
DROP COLUMN "languageSkills",
ADD COLUMN     "languageSkills" "LanguageSkill"[];

-- DropEnum
DROP TYPE "LanguageSkills";

-- CreateTable
CREATE TABLE "Insight" (
    "id" SERIAL NOT NULL,
    "status" "Priority",
    "currentScore" INTEGER,
    "pastScores" JSONB,
    "aiDiagSummary" JSONB,
    "aiRiskFactors" JSONB,
    "aiRecommendations" JSONB,

    CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_insightId_fkey" FOREIGN KEY ("insightId") REFERENCES "Insight"("id") ON DELETE SET NULL ON UPDATE CASCADE;
