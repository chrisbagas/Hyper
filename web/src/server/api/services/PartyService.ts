import { PrismaClient, PartyType, PartyVisibility, PartyMemberLevel, Party } from "@prisma/client"
import { env } from "../../../env.mjs"
import { PlayerStatisticsService } from "./PlayerStatisticsService"

export interface CreatePartyData {
  userId: string,
  gameId: string,
  partyTitle: string,
  partyType: PartyType,
  partyVisibility: PartyVisibility
}

export interface JoinPartyData {
  userId: string,
  partyId: string,
  gameId: string
}

export interface LeavePartyData {
  userId: string,
  partyId: string
}

export interface EditPartyData {
  partyId: string,
  userId: string,
  partyTitle: string,
  partyType: PartyType,
  partyVisibility: PartyVisibility
}

export interface KickPartyMemberData {
  leaderUserId: string,
  memberUserId: string,
  partyId: string
}

export class PartyService {
  public static async getParties(prisma: PrismaClient, gameId: string) {
    return prisma.party.findMany({
      where: {
        gameId: gameId
      },
      include: {
        partyMembers: {
          include: {
            user: true
          }
        }
      },
      orderBy: [{
        id: "asc"
      }]
    })
  }

  public static async createParty(prisma: PrismaClient, data: CreatePartyData, userId: string) {
    const gameAcc = await prisma.gameAccount.findFirst({
      where: {
        userId: userId,
        gameId: data.gameId
      }
    })

    const valorantId = gameAcc?.gameIdentifier
    let rankNumber = 0
    let totalConnect = 0
    if (valorantId) {
      totalConnect = 1
      const valorantIdSplit = valorantId.split('#')
      const valorantUsername = valorantIdSplit[0]
      const valorantTagline = valorantIdSplit[1]
      const valorantMmrData = await PlayerStatisticsService.getValorantMMRData(valorantUsername, valorantTagline)
      rankNumber = valorantMmrData.data.current_data.currenttier 
    }
    
    const newParty = await prisma.party.create({
      data: {
        gameId: data.gameId,
        partyTitle: data.partyTitle,
        partyType: data.partyType,
        totalConnect: totalConnect,
        totalRank: rankNumber,
        partyVisibility: data.partyVisibility,
      }
    })

    await prisma.partyMember.create({
      data: {
        userId: data.userId,
        partyId: newParty.id,
        level: PartyMemberLevel.leader
      }
    })

    const account = await prisma.account.findFirst({
      where: {
        userId: userId,
      }
    })

    const party = await fetch(`${env.DISCORD_SERVICE_URL}/discord/create-channel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.partyTitle,
        authorizedUserIds: [
          account?.providerAccountId,
        ]
      })
    }).then((res) => res.json())

    await this.updateDiscordPartyLink(prisma, newParty.id, party)

    return {
      ...newParty,
      discordInviteLink: party.inviteLink,
    }
  }

  private static async updateDiscordPartyLink(prisma: PrismaClient, partyId: string, party: any) {
    return prisma.party.update({
      where: {
        id: partyId,
      },
      data: {
        discordInviteLink: party.inviteLink,
        discordChannelId: party.id,
      }
    })
  }

  public static async getUserParty(prisma: PrismaClient, userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        partyMember: true,
      }
    })

    if (!user || !user.partyMember) {
      return null
    }

    return prisma.party.findUnique({
      where: {
        id: user.partyMember.partyId
      },
      select: {
        partyMembers: {
          include: {
            user: true
          }
        },
        game: true,
        gameId: true,
        id: true,
        partyTitle: true,
        partyType: true,
        partyVisibility: true,
        discordInviteLink: true,
        totalRank: true,
        totalConnect: true,
      }
    })
  }

  public static async getPartyMemberDetails(prisma: PrismaClient, userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        username: true,
        image: true,
      }
    })
  }

  public static async joinParty(prisma: PrismaClient, data: JoinPartyData) {
    const partyPromise = await prisma.party.findUnique({
      where: {
        id: data.partyId
      },
      include: {
        partyMembers: true
      }
    })
    await this.updatePartyWithRank(prisma,partyPromise,data.userId,true)

    const userPromise = prisma.user.findUnique({
      where: {
        id: data.userId
      },
      include: {
        partyMember: true,
        accounts: true,
      }
    })

    const gamePromise = prisma.game.findUnique({
      where: {
        id: data.gameId
      }
    })

    const party = await partyPromise
    const user = await userPromise
    const game = await gamePromise

    // check if game exists, if not then throw error
    if (!game) {
      throw Error("Error: Game not found")
    }

    // check if party exists and is not full, if not then throw error
    if (!party) {
      throw Error("Error: Party not found")
    }
    if (party?.partyMembers.length >= game.teamCapacity) {
      throw Error("Party already full")
    }

    // check if user exists and is not already in a party, if not then throw error
    if (!user) {
      throw Error("You are not logged in. Please login before joining a party.")
    }
    if (user.partyMember != null && user.partyMember != undefined) {
      throw Error("You are already in party. Please leave the current party if you want to join another one.")
    }

    await fetch(`${env.DISCORD_SERVICE_URL}/discord/user-permission`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        channelId: party.discordChannelId,
        userId: user.accounts[0]?.providerAccountId,
      })
    })

    return prisma.partyMember.create({
      data: {
        userId: data.userId,
        partyId: data.partyId
      }
    })
  }

  public static async updatePartyWithRank (prisma: PrismaClient, party: any,userId: string, isJoin:boolean){
    const gameAcc = await prisma.gameAccount.findFirst({
      where: {
        userId: userId,
        gameId: party.gameId
      }
    })

    console.log(userId, party.gameId)
    console.log(gameAcc)
    const valorantId = gameAcc?.gameIdentifier
    let rankNumber = party.totalRank
    let totalConnect = party.totalConnect
    console.log("\n\n\n\n\n\nTES\n\n\n\n"+valorantId+"\n\n\n\n\n\n")
    if (valorantId) {
      if(isJoin){
        totalConnect = totalConnect + 1
        const valorantIdSplit = valorantId.split('#')
        const valorantUsername = valorantIdSplit[0]
        const valorantTagline = valorantIdSplit[1]
        const valorantMmrData = await PlayerStatisticsService.getValorantMMRData(valorantUsername, valorantTagline)
        rankNumber = rankNumber + valorantMmrData.data.current_data.currenttier
      } else{
        totalConnect = totalConnect - 1
        const valorantIdSplit = valorantId.split('#')
        const valorantUsername = valorantIdSplit[0]
        const valorantTagline = valorantIdSplit[1]
        const valorantMmrData = await PlayerStatisticsService.getValorantMMRData(valorantUsername, valorantTagline)
        rankNumber = rankNumber - valorantMmrData.data.current_data.currenttier
      }
       

      const updateParty = await prisma.party.update({
        where: {
          id: party.id
        },
        data: { 
          totalRank: rankNumber,
          totalConnect: totalConnect
        }
      })
    }
  }

  public static async leaveParty(prisma: PrismaClient, data: LeavePartyData) {

    const partyPromise = await prisma.party.findUnique({
      where: {
        id: data.partyId
      },
      include: {
        partyMembers: true
      }
    })

    await this.updatePartyWithRank(prisma,partyPromise,data.userId,false)
    

    
    return prisma.partyMember.delete({
      where: {
        userId_partyId: {
          userId: data.userId,
          partyId: data.partyId
        }
      }
    })
  }

  public static async updateParty(prisma: PrismaClient, data: EditPartyData) {
    return prisma.party.update({
      where: {
        id: data.partyId
      },
      data: {
        partyTitle: data.partyTitle,
        partyType: data.partyType,
        partyVisibility: data.partyVisibility
      },
    })
  }

  public static async deleteParty(prisma: PrismaClient, data: LeavePartyData) {
    const partyMember = await prisma.partyMember.findUnique({
      where: {
        userId_partyId: {
          userId: data.userId,
          partyId: data.partyId
        }
      }
    })

    // throw error if the user doesn't exist or not in the party
    if (!partyMember) {
      throw Error("Error: User not found")
    }
    // throw error if the user is not leader
    if (partyMember?.level == PartyMemberLevel.member) {
      throw Error("Error: Permission denied, the requesting user is a member")
    }

    return prisma.party.delete({
      where: {
        id: data.partyId
      }
    })
  }

  public static async kickPartyMember(prisma: PrismaClient, data: KickPartyMemberData) {
    const partyLeader = await prisma.partyMember.findFirst({
      where: {
        userId: data.leaderUserId
      }
    })

    const partyMember = await prisma.partyMember.findUnique({
      where: {
        userId_partyId: {
          userId: data.memberUserId,
          partyId: data.partyId
        }
      }
    })

    if (!partyMember || !partyLeader) {
      throw Error("Error: party member not found")
    }

    if (partyLeader.level !== PartyMemberLevel.leader || partyMember.level !== PartyMemberLevel.member) {
      throw Error("Error: you are unauthorized to kick this person")
    }

    const partyPromise = await prisma.party.findUnique({
      where: {
        id: data.partyId
      },
      include: {
        partyMembers: true
      }
    })

    await this.updatePartyWithRank(prisma,partyPromise,data.memberUserId,false)

    return prisma.partyMember.delete({
      where: {
        userId_partyId: {
          userId: data.memberUserId,
          partyId: data.partyId
        }
      }
    })
  }
}
