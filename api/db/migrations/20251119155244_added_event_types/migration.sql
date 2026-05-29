/*
  Warnings:

  - You are about to drop the column `state` on the `Event` table. All the data in the column will be lost.
  - The `eventType` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('TASK', 'LUNCH', 'BREAK');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "state",
ADD COLUMN     "description" TEXT,
DROP COLUMN "eventType",
ADD COLUMN     "eventType" "EventType";
