/*
  Warnings:

  - You are about to drop the column `UpdatedAt` on the `CommunityPost` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `CommunityPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommunityPost" DROP COLUMN "UpdatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
