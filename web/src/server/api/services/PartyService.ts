import { PrismaClient, Party, PartyMemberLevel } from "@prisma/client"

export class PartyService {
    public static async getParties(prisma: PrismaClient, gameId: String): Promise<Party[]> {
        return [];
    }
}