import type { Game, PrismaClient } from "@prisma/client";

export class GameService {
  static getAllGames(prisma: PrismaClient): Promise<Game[]> {
    return prisma.game.findMany()
  }
  static getById(id: string, prisma: PrismaClient) {
    return prisma.game.findUnique({
      where: {
        id: id,
      }
    })
  }
}