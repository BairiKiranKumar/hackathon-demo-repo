/*
  Warnings:

  - A unique constraint covering the columns `[insightId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[overviewId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[encounterId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Member_insightId_key" ON "Member"("insightId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_overviewId_key" ON "Member"("overviewId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_encounterId_key" ON "Member"("encounterId");
