/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `Party` table. All the data in the column will be lost.
  - The `partyType` column on the `Party` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PartyVisibility" AS ENUM ('Public', 'Private');

-- AlterTable
ALTER TABLE "Party" DROP COLUMN "isPrivate",
ADD COLUMN     "partyVisibility" "PartyVisibility",
DROP COLUMN "partyType",
ADD COLUMN     "partyType" "PartyType";
