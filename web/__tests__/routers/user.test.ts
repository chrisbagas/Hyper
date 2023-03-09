import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import prisma from "../../src/server/__mocks__/db";


describe("Authentication RPC", () => {
  it("getProfile should return Profile object", async () => {
    const randomId = randomUUID()
    // @ts-ignore
    prisma.user.findUnique.mockResolvedValue({
      id: randomId,
      username: "",
      name: "Meta",
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
    expect(profile.connectedGames).toStrictEqual([])
  })
})
