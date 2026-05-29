-- CreateEnum
CREATE TYPE "PatientResponseType" AS ENUM ('NO', 'YES');

-- AlterTable
ALTER TABLE "Encounter" ADD COLUMN     "patientResponse" "PatientResponseType";
