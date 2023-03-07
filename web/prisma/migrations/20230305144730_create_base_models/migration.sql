/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "countryCode" TEXT NOT NULL,
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "username" TEXT;

-- CreateTable
CREATE TABLE "Country" (
    "localeCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("localeCode")
);

-- CreateTable
CREATE TABLE "GameAccount" (
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "gameIdentifier" TEXT NOT NULL,
    "statisticsData" JSONB,
    "statisticsLastUpdatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameAccount_pkey" PRIMARY KEY ("userId","gameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country"("localeCode") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameAccount" ADD CONSTRAINT "GameAccount_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameAccount" ADD CONSTRAINT "GameAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
