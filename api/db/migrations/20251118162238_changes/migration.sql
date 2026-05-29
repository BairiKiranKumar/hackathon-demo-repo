/*
  Warnings:

  - Made the column `memberId` on table `Encounter` required. This step will fail if there are existing NULL values in that column.
  - Made the column `memberId` on table `Insight` required. This step will fail if there are existing NULL values in that column.
  - Made the column `memberId` on table `Overview` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Encounter" DROP CONSTRAINT "Encounter_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Insight" DROP CONSTRAINT "Insight_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Overview" DROP CONSTRAINT "Overview_memberId_fkey";

-- AlterTable
ALTER TABLE "Encounter" ALTER COLUMN "memberId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Insight" ALTER COLUMN "memberId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Overview" ALTER COLUMN "memberId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Insight" ADD CONSTRAINT "Insight_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Overview" ADD CONSTRAINT "Overview_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
