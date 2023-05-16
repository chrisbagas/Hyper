/*
  Warnings:

  - Added the required column `imageUrl` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "imageUrl" TEXT NOT NULL;
