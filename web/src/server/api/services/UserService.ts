import { Game, PrismaClient } from "@prisma/client";

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
      include:{
        GameAccount:{
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
      connectedGames: user.GameAccount.map((item)=>{
        return {
          gameId:item.gameId,
          username: item.gameIdentifier,
          game:item.game
        }
      })
      
    }
  }

  public static async submitOnboarding(userId: string, prisma: PrismaClient) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      }
    });
  }
}
