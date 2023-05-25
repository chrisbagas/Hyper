/*
  Warnings:

  - Added the required column `totalConnect` to the `Party` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalRank` to the `Party` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Party" ADD COLUMN     "totalConnect" INTEGER NOT NULL,
ADD COLUMN     "totalRank" INTEGER NOT NULL;
