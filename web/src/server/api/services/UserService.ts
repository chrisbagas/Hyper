import { Game, PrismaClient } from "@prisma/client";
import { DiscordService } from "./DiscordService";
import { DiscordConnection } from "../../types/discord";

export interface ProfileGame {
  gameId: string
  username: string
  game: Game
}

export interface Profile {
  id: string
  username: string | null
  name: string | null
  connectedGames: ProfileGame[]
}

export class UserService {
  public static async getProfile(id: string, prisma: PrismaClient): Promise<Profile> {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        GameAccount: {
          include: {
            game: true
          }
        }
      }
    })

    if (!user) {
      throw Error("User not found")
    }

    return {
      id: user.id,
      username: user.username,
      name: user.name,
      connectedGames: user.GameAccount.map((item) => {
        return {
          gameId: item.gameId,
          username: item.gameIdentifier,
          game: item.game
        }
      })

    }
  }
  public static async createConnectionAccount(id: string, prisma: PrismaClient) {

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
    return accounts
  }
}
