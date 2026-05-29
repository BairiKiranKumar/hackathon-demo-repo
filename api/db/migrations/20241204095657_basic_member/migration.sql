-- CreateEnum
CREATE TYPE "LanguageSkills" AS ENUM ('SPEAK', 'READ', 'WRITE');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "ethnicity" TEXT,
    "language" TEXT,
    "languageSkills" "LanguageSkills"[],
    "phone" TEXT,
    "address" TEXT,
    "status" "Priority",
    "currentScore" INTEGER,
    "pastScore" INTEGER,
    "pastScoreDate" TIMESTAMP(3),
    "image" TEXT,
    "quote" TEXT,
    "bio" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
