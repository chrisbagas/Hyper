import { randomUUID } from "crypto"
import { describe, expect, it } from "vitest"
import { GameService } from "../../src/server/api/services/GameService"
import prisma from "../../src/server/__mocks__/db"

describe("Game Service", () => {
  it("getAll should return all games", async () => {
    const mockPrisma = prisma

    const mockedValorant = {
        id: "testGame1",
        name: "Valorant",
        logoUrl: "logoLink01",
        teamCapacity: 5,
    }

    const mockedCSGO = {
        id: "testGame2",
        name: "CS:GO",
        logoUrl: "logoLink02",
        teamCapacity: 5,
    }

    prisma.game.findMany.mockResolvedValue([
        mockedValorant,
        mockedCSGO,
    ])

    const games = await GameService.getAllGames(mockPrisma)

    expect(games).toBeTruthy()
    expect(games).toHaveLength(2)
    expect(games[0]).toStrictEqual(mockedValorant)
  })

  it("getById should return correct game", async () => {
    const mockPrisma = prisma
    const mockedValorant = {
        id: "testGame1",
        name: "Valorant",
        logoUrl: "logoLink01",
        teamCapacity: 5,
      }

    prisma.game.findUnique.mockResolvedValue(mockedValorant)

    const games = await GameService.getById(mockedValorant.id, mockPrisma)

    expect(games).toBeTruthy()
    expect(games).toStrictEqual(mockedValorant)
  })

  it("getById should return null when no games found", async () => {
    const randomId = randomUUID()

    prisma.game.findUnique.mockResolvedValue(null)

    await expect(GameService.getById(randomId, prisma)).resolves.toBeNull()
  })
})
