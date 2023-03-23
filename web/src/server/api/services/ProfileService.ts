import { PrismaClient, Game, Country } from "@prisma/client";
import Discord from "next-auth/providers/discord";
import { DiscordConnection } from "../../types/discord";
import { DiscordService } from "./DiscordService";

export interface Profile {
    id: string
    username: string | null
    bio: string
    image: string
    countryCode: string | null
    games: Game[]
    country: Country | null
}
export interface AccountC {
    type: string;
    id: string;
    name: string;
    visibility: number;
    friend_sync: boolean;
    show_activity: boolean;
    verified: boolean;
    two_way_link: boolean;
    metadata_visibility: number;
  }
  

export class ProfileService {
    public static async getProfile(id: string, prisma: PrismaClient): Promise<Profile> {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                accounts: true,
                country:true,
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
            username: user.username ?? user.name,
            bio: user.bio ?? "No information provided",
            image: user.image ,
            countryCode: user.countryCode,
            country: user.country,
            games: user.GameAccount.map((item) => {
                return item.game
            })
        }
    }
    
    public static async updateProfile(id: string, data: Partial<Profile>, prisma: PrismaClient) {
        const user = await prisma.user.update({
            where: { id },
            data: {
                username: data.username,
                bio: data.bio,
                countryCode: data.countryCode,
            },
        });

        if (!user) {
            throw Error("User not found");
        }
    }
    public static async getAllCountries(prisma: PrismaClient){
        const countries = await prisma.country.findMany()
        return countries
    }

    public static async getConnectionAccount(id: string, prisma: PrismaClient) {
        
        const accounts = await DiscordService.getUserConnections(id, prisma);
        const riotGamesAccount = accounts.find((account: DiscordConnection) => account.type === 'riotgames');
    
        if (riotGamesAccount) {
            const game = await prisma.game.findFirst({ where: { name: "Valorant" } });
            const gameAkun = await prisma.gameAccount.upsert({
                where: {
                    userId_gameId: {
                        userId: id,
                        gameId: game?.id ?? "1", // Valorant
                    },
                },
                update: {},
                create: {
                    userId: id,
                    gameId: game?.id ?? "1", // Valorant
                    gameIdentifier: riotGamesAccount.name,
                    createdAt: "2020-01-01T00:00:00.000Z",
                },
            });
            
    
            console.log(`Game account upserted: ${gameAkun}`);
        }
    
        const gameAkuns = await prisma.gameAccount.findMany({
            where: { userId: id },
            include: { game: true }
        });
    
        const dataaa = { connected: accounts, gameAkuns: gameAkuns };
    
        return dataaa;
    }

    
    
}
