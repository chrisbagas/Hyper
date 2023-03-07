import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";

import prisma from "../../src/server/__mocks__/db";

vi.mock("../../src/server/db")

describe("Game RPC", () => {
  it("getAll should return all games", async () => {
    const mockedDota = {
      id: "test",
      name: "DOTA2",
      logoUrl: "Hello, World!",
    }

    prisma.game.findMany.mockResolvedValue([
      mockedDota,
      mockedDota,
    ])

    const ctx = {
      session: null,
      prisma
    }

    const caller = appRouter.createCaller(ctx)
    const games = await caller.games.getAll()

    expect(games).toHaveLength(2)
    expect(games[0]).toStrictEqual(mockedDota)
  })
})
