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

export interface LeavePartyData {
    
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
        const party = await prisma.party.findUnique({
            where: {
                id: data.partyId
            },
            include: {
                partyMembers: true
            }
        })

        const user = await prisma.user.findUnique({
            where: {
                id: data.userId
            },
            include: {
                partyMember: true
            }
        })

        // check if party exists and is not full, if not then throw error
        if (party == null) {
            throw Error("Error: Party not found")
        }
        if (party?.partyMembers.length >= 5) {
            throw Error("Error: Party already full")
        }

        // check if user exists and is not already in a party, if not then throw error
        if (user == undefined) {
            throw Error("Error: User not found")
        }
        if (user.partyMember != null) {
            throw Error("Error: user already in party")
        }

        return prisma.partyMember.create({
            data: data
        })
    }
}