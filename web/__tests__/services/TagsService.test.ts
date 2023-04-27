import { describe, expect, it } from "vitest"
import { TagService } from "../../src/server/api/services/TagService"
import prisma from "../../src/server/__mocks__/db"

describe("Tag Service", () => {
  it("getAll should return all tags", async () => {
    const mockPrisma = prisma

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

    const tags = await TagService.getAllTags(mockPrisma)

    expect(tags).toBeTruthy()
    expect(tags).toHaveLength(2)
    expect(tags[0]).toStrictEqual(mockedGuide)
  })

})
