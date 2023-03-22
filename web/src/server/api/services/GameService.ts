import type { PrismaClient } from "@prisma/client";

export class GameService {
  static getAllGames(prisma: PrismaClient) {
    return prisma.game.findMany({
      include: {
        communityPosts: true,
      }
    })
  }
  static getById(id: string, prisma: PrismaClient) {
    return prisma.game.findUnique({
      where: {
        id: id,
      }
    })
  }
}