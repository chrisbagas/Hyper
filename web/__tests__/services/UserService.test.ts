import { randomUUID } from "crypto"
import { describe, expect, it, vi } from "vitest"
import { UserService } from "../../src/server/api/services/UserService"
import prisma from "../../src/server/__mocks__/db"
import { DiscordService } from "../../src/server/api/services/DiscordService";

vi.mock("../../src/server/api/services/DiscordService", () => {
  const expectedConnections = [
      {
          "type": "riotgames",
          "id": "1",
          "name": "Rostova#5722",
          "visibility": 0,
          "friend_sync": true,
          "show_activity": true,
          "verified": true,
          "two_way_link": false,
          "metadata_visibility": 1
      }
  ]

  const expectedDetails = {
      "id": "150579219057868802",
      "username": "Meta",
      "display_name": null,
      "avatar": "298b99f01f5f967db673b9801308c5ec",
      "avatar_decoration": null,
      "discriminator": "0147",
      "public_flags": 64,
      "flags": 64,
      "banner": null,
      "banner_color": null,
      "accent_color": null,
      "locale": "en-GB",
      "mfa_enabled": true,
      "premium_type": 0,
      "email": "tmgfaction@gmail.com",
      "verified": true
  }

  return {
      DiscordService: {
          getUserDetails: vi.fn().mockResolvedValue(expectedDetails),
          getUserConnections: vi.fn().mockResolvedValue(expectedConnections),
      }
  }
})

describe("User Service", () => {
  it("getProfile should return user detail", async () => {
    const mockPrisma = prisma
    const randomId = randomUUID()

    const mockGameAccount = {
      userId: randomId,
      gameId: "1",
      gameIdentifier: "rostova",
      statisticsData: null,
      statisticsLastUpdatedAt: null,
      createdAt: new Date(),
      game: {
          id: "1",
          name: "valorant",
          logoUrl: "lala"
      }
  }

    // @ts-ignore
    prisma.user.findUnique.mockResolvedValue({
      id: randomId,
      username: "rostova",
      name: "Meta",
      GameAccount: [mockGameAccount]
      
    })

    const profile = await UserService.getProfile(randomId, mockPrisma)

    expect(profile.name).toBe("Meta")
    expect(profile.username).toBe("rostova")
    expect(profile.id).toBe(randomId)
    
  })

  it("getProfile should throw error when user not found", async () => {
    const randomId = randomUUID()

    prisma.user.findUnique.mockResolvedValue(null)

    await expect(UserService.getProfile(randomId, prisma)).rejects.toThrow()
  })
  it('getConnectionAccount should return the expected data', async () => {
    // Define mock data for the function's dependencies
    

    const game = { id: '1', name: 'Valorant', logoUrl: 'lala' };
    const gameAkun = {
        id: '1',
        userId: '12345',
        gameId: '1',
        gameIdentifier: 'Rostova#5722',
        statisticsData: null,
        statisticsLastUpdatedAt: null,
        createdAt: new Date(),
    };
    const gameAkuns = [gameAkun];

    const mockPrisma = prisma;

    

    // You can then use the mocked function in your tests
    const expectedConnections = [
        {
            "type": "riotgames",
            "id": "1",
            "name": "Rostova#5722",
            "visibility": 0,
            "friend_sync": true,
            "show_activity": true,
            "verified": true,
            "two_way_link": false,
            "metadata_visibility": 1
        }
    ];

    const connections = await DiscordService.getUserConnections("12345",mockPrisma);

    expect(connections).toStrictEqual(expectedConnections);

    prisma.game.findFirst.mockResolvedValue(game);
    prisma.gameAccount.upsert.mockResolvedValue(gameAkun);
    prisma.gameAccount.findMany.mockResolvedValue(gameAkuns);

    const data = await UserService.createConnectionAccount("12345",mockPrisma)
    const expectedData = { connected: expectedConnections, gameAkuns: gameAkuns }


})

  it('createConnectionAccount should create new gameConnection', async () => {
    // Define mock data for the function's dependencies
    

    const game = null;
    const gameAkun = {
        id: '1',
        userId: '12345',
        gameId: '1',
        gameIdentifier: 'Rostova#5722',
        statisticsData: null,
        statisticsLastUpdatedAt: null,
        createdAt: new Date(),
    };
    const gameAkuns = [gameAkun];

    const mockPrisma = prisma;

    

    // You can then use the mocked function in your tests
    const expectedConnections = [
        {
            "type": "riotgames",
            "id": "1",
            "name": "Rostova#5722",
            "visibility": 0,
            "friend_sync": true,
            "show_activity": true,
            "verified": true,
            "two_way_link": false,
            "metadata_visibility": 1
        }
    ];

    const connections = await DiscordService.getUserConnections("12345",mockPrisma);

    expect(connections).toStrictEqual(expectedConnections);

    prisma.game.findFirst.mockResolvedValue(game);
    prisma.gameAccount.upsert.mockResolvedValue(gameAkun);
    prisma.gameAccount.findMany.mockResolvedValue(gameAkuns);

    const data = await UserService.createConnectionAccount("12345",mockPrisma)
 
  })

  

})
