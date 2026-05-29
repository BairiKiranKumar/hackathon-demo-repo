/*
  Warnings:

  - You are about to drop the `ScheduledEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ScheduledEvent" DROP CONSTRAINT "ScheduledEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledEvent" DROP CONSTRAINT "ScheduledEvent_userId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "assignedUserId" INTEGER;

-- DropTable
DROP TABLE "ScheduledEvent";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
