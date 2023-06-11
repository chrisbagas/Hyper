-- CreateEnum
CREATE TYPE "PartyMemberLevel" AS ENUM ('member', 'leader');

-- CreateTable
CREATE TABLE "Party" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "discordInviteLink" TEXT,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartyMember" (
    "userId" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "level" "PartyMemberLevel" NOT NULL,

    CONSTRAINT "PartyMember_pkey" PRIMARY KEY ("userId","gameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartyMember_userId_key" ON "PartyMember"("userId");

-- AddForeignKey
ALTER TABLE "PartyMember" ADD CONSTRAINT "PartyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyMember" ADD CONSTRAINT "PartyMember_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyMember" ADD CONSTRAINT "PartyMember_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
