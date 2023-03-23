import { randomUUID } from "crypto"
import { describe, expect, it } from "vitest"
import { UserService } from "../../src/server/api/services/UserService"
import prisma from "../../src/server/__mocks__/db"

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
})
