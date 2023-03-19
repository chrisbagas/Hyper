import { PrismaClient, Party, PartyType, PartyVisibility, PartyMember, GameAccount, PartyMemberLevel } from "@prisma/client"

export interface CreatePartyData {
    gameId: string,
    partyTitle: string,
    minimumRank: string,
    partyType: PartyType,
    partyVisibility: PartyVisibility
}

export interface JoinPartyData {
    userId: string,
    partyId: string,
    gameId: string
} 

export class PartyService {
    public static async getParties(prisma: PrismaClient, gameId: string): Promise<Party[]> { 
        return prisma.party.findMany({
            where: {
                gameId: gameId
            }
        })
    }

    public static async createParty(prisma: PrismaClient, data: CreatePartyData): Promise<Party> {
        return prisma.party.create({
            data: data
        })
    }

    public static async joinParty(prisma: PrismaClient, data: JoinPartyData): Promise<PartyMember> {
        return {} as any;
    }
}