import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";

import prisma from "../../src/server/__mocks__/db";

vi.mock("../../src/server/db")

describe("Game Data RPC", () => {
  it("getAll should return all games", async () => {
    const mockedValorant = {
      id: "testGame1",
      name: "Valorant",
      logoURL: "logoLink01",
    }
    const mockedCSGO = {
      id: "testGame2",
      name: "CS:GO",
      logoURL: "logoLink02",
    }

    prisma.game.findMany.mockResolvedValue([
      mockedValorant,
      mockedCSGO,
    ])

    const ctx = {
      session: null,
      prisma
    }

    const caller = appRouter.createCaller(ctx)
    const games = await caller.games.getAll()

    expect(games).toHaveLength(2)
    expect(games[0]).toStrictEqual(mockedValorant)
  }),

  it("getById should return correct game", async () => {
    const mockedValorant = {
      id: "testGame1",
      name: "Valorant",
      logoURL: "logoLink01",
    }
    const mockedCSGO = {
      id: "testGame2",
      name: "CS:GO",
      logoURL: "logoLink02",
    }

    prisma.game.findMany.mockResolvedValue([
      mockedValorant,
      mockedCSGO,
    ])

    prisma.game.findUnique.mockResolvedValue(mockedValorant)

    const ctx = {
      session: null,
      prisma
    }

    const caller = appRouter.createCaller(ctx)
    const games = await caller.games.getById("testGame1")

    expect(games).toStrictEqual(mockedValorant)

  })
})


