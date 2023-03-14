import { PrismaClient, Party, PartyType, PartyVisibility } from "@prisma/client"

export interface PartyCreateData {
    gameId: string,
    partyTitle: string,
    partyType: PartyType,
    partyVisibility: PartyVisibility
}

export class PartyService {
    public static async getParties(prisma: PrismaClient, gameId: string): Promise<Party[]> {
        const parties = prisma.party.findMany({
            where: {
                gameId: gameId
            }
        })
        return parties;
    }
    public static async createParty(prisma: PrismaClient, data: PartyCreateData): Promise<Party> {
        const party = prisma.party.create({
            data: data
        })
        return party
    }
}