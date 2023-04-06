-- DropForeignKey
ALTER TABLE "PartyMember" DROP CONSTRAINT "PartyMember_gameId_fkey";

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
