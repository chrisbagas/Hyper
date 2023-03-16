import { PrismaClient, Party, PartyType, PartyVisibility } from "@prisma/client"

export interface PartyCreateData {
    gameId: string,
    partyTitle: string,
    minimumRank: string,
    partyType: PartyType,
    partyVisibility: PartyVisibility
}

export class PartyService {
    public static async getParties(prisma: PrismaClient, gameId: string): Promise<Party[]> { 
        return prisma.party.findMany({
            where: {
                gameId: gameId
            }
        })
    }
    public static async createParty(prisma: PrismaClient, data: PartyCreateData): Promise<Party> {
        return prisma.party.create({
            data: data
        })
    }
}