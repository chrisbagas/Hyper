import { User } from "@prisma/client";
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import prisma from "../../src/server/__mocks__/db";


describe("Authentication RPC", () => {
  it("getUser should return User object", async () => {
    const mockedUser: Partial<User> = {
      id: "ABC",
      username: "Meta",
      profileImage: "Test"
    }

    prisma.user.findUnique.mockResolvedValue(mockedUser)

    const ctx = {
      session: "a",
      prisma,
    }

    const caller = appRouter.createCaller(ctx)
    const user = await caller.auth.getUser()

    expect(user).toBeTruthy()
    expect(user).toBe(mockedUser)
  })
})
