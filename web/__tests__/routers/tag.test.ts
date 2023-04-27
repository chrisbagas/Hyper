import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";

import prisma from "../../src/server/__mocks__/db";

vi.mock("../../src/server/db")

describe("Tag Data RPC", () => {
  it("getAll should return all tags", async () => {
    const mockedGuide = {
      id: "guide",
      slug: "guidetag",
      name: "Guide"
    }
    const mockedClip = {
      id: "clip",
      slug: "cliptag",
      name: "Clips"
    }

    prisma.communityTag.findMany.mockResolvedValue([
      mockedGuide,
      mockedClip,
    ])

    const ctx = {
      session: null,
      prisma
    }

    const caller = appRouter.createCaller(ctx)
    const tags = await caller.tag.getAll()

    expect(tags).toBeTruthy()
    expect(tags).toHaveLength(2)
    expect(tags[0]).toStrictEqual(mockedGuide)
  })

})


