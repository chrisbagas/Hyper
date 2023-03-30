import { PrismaClient, PartyType, PartyVisibility, PartyMemberLevel, Game } from "@prisma/client"

export interface CreatePartyData {
    userId: string,
    gameId: string,
    partyTitle: string,
    partyType: PartyType,
    partyVisibility: PartyVisibility
}

export interface JoinPartyData {
    userId: string,
    partyId: string,
    gameId: string
} 

export interface LeavePartyData {
    userId: string,
    partyId: string
}

export interface EditPartyData {
    partyId: string,
    userId: string,
    partyTitle: string,
    partyType: PartyType,
    partyVisibility: PartyVisibility
}

export class PartyService {
    public static async getParties(prisma: PrismaClient, gameId: string) {
        return prisma.party.findMany({
            where: {
                gameId: gameId
            },
            include:{
                partyMembers: true
            }
        })
    }

    public static async createParty(prisma: PrismaClient, data: CreatePartyData){
        const newParty = await prisma.party.create({
            data: data
        })
        
        await prisma.partyMember.create({
            data: {
                userId: data.userId,
                partyId: newParty.id,
                level: PartyMemberLevel.leader
            }
        })

        return newParty
    }

    public static async joinParty(prisma: PrismaClient, data: JoinPartyData){
        let partyPromise = prisma.party.findUnique({
            where: {
                id: data.partyId
            },
            include: {
                partyMembers: true
            }
        })

        let userPromise = prisma.user.findUnique({
            where: {
                id: data.userId
            },
            include: {
                partyMember: true
            }
        })

        const gamePromise = prisma.game.findUnique({
            where: {
                id: data.gameId
            }
        })

        const party = await partyPromise
        const user = await userPromise
        const game = await gamePromise

        // check if game exists, if not then throw error
        if (game == null || game == undefined) {
            throw Error("Error: Game not found")
        }

        // check if party exists and is not full, if not then throw error
        if (party == null || party == undefined) {
            throw Error("Error: Party not found")
        }
        if (party?.partyMembers.length >= game.teamCapacity) {
            throw Error("Error: Party already full")
        }

        // check if user exists and is not already in a party, if not then throw error
        if (user == null || user == undefined) {
            throw Error("Error: User not found")
        }
        if (user.partyMember != null && user.partyMember != undefined) {
            throw Error("Error: user already in party")
        }

        return prisma.partyMember.create({
            data: {
                userId: data.userId,
                partyId: data.partyId
            }
        })
    }

    public static async leaveParty(prisma: PrismaClient, data: LeavePartyData){
        return prisma.partyMember.delete({
            where: {
                userId_partyId: {
                    userId: data.userId,
                    partyId: data.partyId
                }
            }
        })
    }

    public static async updateParty(prisma: PrismaClient, data: EditPartyData) {
        const partyMember = await prisma.partyMember.findUnique({
            where: {
                userId_partyId: {
                    userId: data.userId,
                    partyId: data.partyId
                }
            }
        })

        // throw error if the user doesn't exist or not in the party
        if (partyMember == null || partyMember == undefined) {
            throw Error("Error: User not found")
        }
        // throw error if the user is not leader
        if (partyMember.level == PartyMemberLevel.member) {
            throw Error("Error: Permission denied, the requesting user is a member")
        }

        return await prisma.party.update({
            where: {
                id: data.partyId
            },
            data: {
                partyTitle: data.partyTitle,
                partyType: data.partyType,
                partyVisibility: data.partyVisibility
            },
        })
    }

    public static async deleteParty(prisma: PrismaClient, data: LeavePartyData) {
        return {}
    }
}