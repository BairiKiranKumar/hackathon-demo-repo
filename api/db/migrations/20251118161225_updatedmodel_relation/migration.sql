/*
  Warnings:

  - You are about to drop the column `encounterId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `insightId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `overviewId` on the `Member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[memberId]` on the table `Encounter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberId]` on the table `Insight` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberId]` on the table `Overview` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_encounterId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_insightId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_overviewId_fkey";

-- DropIndex
DROP INDEX "Member_encounterId_key";

-- DropIndex
DROP INDEX "Member_insightId_key";

-- DropIndex
DROP INDEX "Member_overviewId_key";

-- AlterTable
ALTER TABLE "Encounter" ADD COLUMN     "memberId" INTEGER;

-- AlterTable
ALTER TABLE "Insight" ADD COLUMN     "memberId" INTEGER;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "encounterId",
DROP COLUMN "insightId",
DROP COLUMN "overviewId";

-- AlterTable
ALTER TABLE "Overview" ADD COLUMN     "memberId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Encounter_memberId_key" ON "Encounter"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Insight_memberId_key" ON "Insight"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Overview_memberId_key" ON "Overview"("memberId");

-- AddForeignKey
ALTER TABLE "Insight" ADD CONSTRAINT "Insight_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Overview" ADD CONSTRAINT "Overview_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
