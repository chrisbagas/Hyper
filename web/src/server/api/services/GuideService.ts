import { PrismaClient } from "@prisma/client";


export class GuideService {
    public static async getAllbyGame(id: string, prisma: PrismaClient): Promise<any> {
        const guides = await prisma.game.findUnique({
            where: {
                id:id
            },
            select:{
                communityPosts:true
            }
        })
        
        if (!guides) {
            throw Error("Game not found")
        }

        return guides
    }
}
