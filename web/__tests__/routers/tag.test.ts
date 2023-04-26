import "@testing-library/react"
import { randomUUID } from "crypto"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

import prisma from "../../src/server/__mocks__/db";

vi.mock("../../src/server/db")

describe("Tag Data RPC", () => {
  it("getAll should return all tags", async () => {
//     const mockedValorant = {
//       id: "testGame1",
//       name: "Valorant",
//       logoUrl: "logoLink01",
//       teamCapacity: 5,
//     }
//     const mockedCSGO = {
//       id: "testGame2",
//       name: "CS:GO",
//       logoUrl: "logoLink02",
//       teamCapacity: 5,
//     }

//     prisma.game.findMany.mockResolvedValue([
//       mockedValorant,
//       mockedCSGO,
//     ])

//     const ctx = {
//       session: null,
//       prisma
//     }

//     const caller = appRouter.createCaller(ctx)
//     const games = await caller.games.getAll()

//     expect(games).toBeTruthy()
//     expect(games).toHaveLength(2)
//     expect(games[0]).toStrictEqual(mockedValorant)
//   }),

})


