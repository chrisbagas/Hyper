/*
  Warnings:

  - The primary key for the `PartyMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gameId` on the `PartyMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PartyMember" DROP CONSTRAINT "PartyMember_pkey",
DROP COLUMN "gameId",
ADD CONSTRAINT "PartyMember_pkey" PRIMARY KEY ("userId", "partyId");
