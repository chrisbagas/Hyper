import { randomUUID } from "crypto"
import { describe, expect, it } from "vitest"
import { TagService } from "../../src/server/api/services/TagService"
import prisma from "../../src/server/__mocks__/db"

describe("Tag Service", () => {
  it("getAll should return all tags", async () => {
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

})
