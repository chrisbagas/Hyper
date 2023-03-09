import { PrismaClient} from "@prisma/client";

export class GuideService {
    public static async getAllbyGame(id: string, prisma: PrismaClient) {
        const guides = await prisma.game.findUnique({
            where: {
                id:id
            },
            select:{
                communityPosts:{
                    include:{
                        author:true,
                        header:true
                    }
                }
            }
        })
        
        if (!guides) {
            throw Error("Game not found")
        }

        return guides.communityPosts
    }
}
