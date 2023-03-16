import { PrismaClient } from "@prisma/client"
import { DiscordAccount, DiscordConnections } from "../../types/discord";

export class DiscordService {
  static fetchDiscord = (
    path: string,
    options?: RequestInit,
  ) => fetch(`https://discord.com/api${path}`, options)

  static async getDiscordToken(userId: string, prisma: PrismaClient) {
    const account = await prisma.account.findFirst({
      where: {
        userId,
      },
      select: {
        access_token: true,
      },
    });

    return account?.access_token;
  }


  public static async getUserDetails(userId: string, prisma: PrismaClient): Promise<DiscordAccount> {
    const accessToken = await this.getDiscordToken(userId, prisma);
    const userData = await this.fetchDiscord("/users/@me", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    })
      .then((res) => res.json());

    return userData;
  }

  public static async getUserConnections(userId: string, prisma: PrismaClient): Promise<DiscordConnections> {
    const accessToken = await this.getDiscordToken(userId, prisma);
    const connections = await this.fetchDiscord("/users/@me/connections", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    })
      .then((res) => res.json());

    return connections;
  }
}
