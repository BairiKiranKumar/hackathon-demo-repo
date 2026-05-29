/*
  Warnings:

  - You are about to drop the column `due` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `transcript` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "due",
DROP COLUMN "summary",
DROP COLUMN "transcript",
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "eventType" TEXT,
ADD COLUMN     "state" TEXT;
