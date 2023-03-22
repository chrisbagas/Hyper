import { PrismaClient, Game } from "@prisma/client";

export interface Profile {
    id: string
    username: string | null
    bio: string
    image: string
    countryCode: string | null
    games: Game[]
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

    
    
}
