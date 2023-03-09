import { PrismaClient, Party, PartyType, PartyVisibility } from "@prisma/client"

export interface PartyCreateData {
    gameId: string,
    partyTitle: string,
    partyType: PartyType,
    partyVisibility: PartyVisibility
}

export class PartyService {
    public static async getParties(prisma: PrismaClient, gameId: String): Promise<Party[]> {
        // todo: get party using prisma
        return [];
    }
    public static async createParty(prisma: PrismaClient, data: PartyCreateData): Promise<Party[]> {
        // todo: create party using prisma
        const discordLink = getDiscordLink()
        return []
    }
}

function getDiscordLink() {
    return ""
}