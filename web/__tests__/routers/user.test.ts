import { randomUUID } from "crypto";
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import prisma from "../../src/server/__mocks__/db";
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

  return {
      DiscordService: {
          getUserConnections: vi.fn().mockResolvedValue(expectedConnections),
      }
  }
})
describe("Authentication RPC", () => {
  it("getProfile should return Profile object", async () => {
    
    const randomId = randomUUID()
    const mockGameAccount = {
      userId: randomId,
      gameId: "1",
      gameIdentifier: "",
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
      username: "",
      name: "Meta",
      GameAccount: [mockGameAccount]
    })

    const ctx = {
      session: {
        user: {
          id: randomId
        }
      },
      prisma,
    }

    const caller = appRouter.createCaller(ctx)
    const profile = await caller.users.getProfile()

    expect(profile).toBeTruthy()
    expect(profile.name).toBe("Meta")
    expect(profile.username).toBe("")
    expect(profile.id).toBe(randomId)
    expect(profile.connectedGames[0]?.username).toStrictEqual(mockGameAccount.gameIdentifier)
  })
  it("createConnection should create gameConnection", async () => {
    
    const ctx = {
      session: {
        user: {
          id: "12345"
        }
      },
      prisma,
    }

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
        const caller = appRouter.createCaller(ctx)
        const data = await caller.users.createConnectionAccount()
        const expectedData = { connected: expectedConnections, gameAkuns: gameAkuns };

    
  })
})
