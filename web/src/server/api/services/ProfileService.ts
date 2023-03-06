import { PrismaClient, Game } from "@prisma/client";

export interface Profile {
    id: string
    username: string | null
    bio: string
    countryCode: string
    games: Game[]
}

export class ProfileService {
    public static async getProfile(id: string, prisma: PrismaClient): Promise<Profile> {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                accounts: true,
                GameAccount: {
                    include: {
                        game: true
                    }
                },
            }
        })
        
        if (!user) {
            throw Error("User not found")
        }

        return {
            id: user.id,
            username: user.username,
            bio: user.bio ?? "No information provided",
            countryCode: user.countryCode,
            games: user.GameAccount.map((item) => {
                return item.game
            })
        }
    }
}