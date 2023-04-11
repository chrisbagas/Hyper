-- DropForeignKey
ALTER TABLE "PartyMember" DROP CONSTRAINT "PartyMember_partyId_fkey";

-- AddForeignKey
ALTER TABLE "PartyMember" ADD CONSTRAINT "PartyMember_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE CASCADE ON UPDATE CASCADE;
