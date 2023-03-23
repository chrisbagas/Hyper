import { randomUUID } from "crypto";
import { describe, expect, it } from "vitest"
import { appRouter } from "../../src/server/api/root";
import prisma from "../../src/server/__mocks__/db";


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
})
