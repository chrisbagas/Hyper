import { PrismaClient } from "@prisma/client";

export interface ProfileGame {
  gameId: string
  username: string
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
      }
    })

    if (!user) {
      throw Error("User not found")
    }

    return {
      id: user.id,
      username: user.username,
      name: user.name,
      connectedGames: []
    }
  }
}
