/*
  Warnings:

  - You are about to drop the column `type` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "type",
ADD COLUMN     "aiScheduled" BOOLEAN,
ADD COLUMN     "encounterId" INTEGER,
ADD COLUMN     "isDraggable" BOOLEAN,
ADD COLUMN     "status" TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
