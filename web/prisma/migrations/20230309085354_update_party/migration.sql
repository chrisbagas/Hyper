/*
  Warnings:

  - Added the required column `isPrivate` to the `Party` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partyTitle` to the `Party` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partyType` to the `Party` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PartyType" AS ENUM ('Competitive', 'Casual');

-- AlterTable
ALTER TABLE "Party" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL,
ADD COLUMN     "partyTitle" TEXT NOT NULL,
ADD COLUMN     "partyType" TEXT NOT NULL;
