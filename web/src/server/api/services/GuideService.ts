import { CommunityPostStatus, PrismaClient} from "@prisma/client";

export class GuideService {
    public static async getAllbyGame(id: string, prisma: PrismaClient, tagId?: string) {
        const guides = await prisma.game.findUnique({
            where: {
                id:id
            },
            select:{
                communityPosts:{
                    where:{
                        status:CommunityPostStatus.PUBLISHED,
                        tags:tagId?
                        {
                            some:{
                                tagId:tagId
                            }
                        } : undefined
                    },
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
    public static async getAllbyUser(gameId: string, userID: string, prisma: PrismaClient) {
        const guides = await prisma.game.findUnique({
            where: {
                id:gameId
            },
            select:{
                communityPosts:{
                    where:{
                        authorId:userID
                    },
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
