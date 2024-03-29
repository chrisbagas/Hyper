import { CommunityPostStatus, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export class GuideService {
  public static async getAllbyGame(id: string, prisma: PrismaClient, tagId?: string, search?: string) {
    const guides = await prisma.game.findUnique({
      where: {
        id: id
      },
      select: {
        communityPosts: {
          where: {
            status: CommunityPostStatus.PUBLISHED,
            tags: tagId ?
              {
                some: {
                  tagId: tagId
                }
              } : undefined,
            title: {
              contains: search,
              mode: "insensitive"
            }
          },
          include: {
            author: true,
            header: true
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
        id: gameId
      },
      select: {
        communityPosts: {
          where: {
            authorId: userID
          },
          include: {
            author: true,
            header: true
          }
        }
      }
    })

    if (!guides) {
      throw Error("Game not found")
    }
    return guides.communityPosts
  }
  
  public static async getAll(page: number, pageSize: number, prisma: PrismaClient) {
      const skip = (page - 1) * pageSize;
      const take = pageSize;
      
      return prisma.communityPost.findMany({
          orderBy: {
              title: 'desc',
          },
          include: {
              author: true,
              header: true,
              game: true,
          },
          skip,
          take,
      });
  }

  public static async updateStatusModerationById(id: string, status: CommunityPostStatus, prisma: PrismaClient) {
    const post = await prisma.communityPost.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        status: true,
      },
    })
    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: "Post not found"
      })
    }
    if (post.status === CommunityPostStatus.DRAFT) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: "You are not allowed to take down a draft post"
      })
    }
    if (status === CommunityPostStatus.DRAFT) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: "You are not allowed to update to draft status"
      })
    }
    try {
      await prisma.communityPost.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
      })
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to update a post, try again later.'
      })
    }
    return {
      message: "Post updated successfully"
    }
  }
}
