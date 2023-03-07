import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import prisma from "../../src/server/__mocks__/db";
import { CommunityPostType, CommunityPostStatus, ContentType } from "@prisma/client"

vi.mock("../../src/server/db")

describe("Community Post RPC", () => {
  it("getById should return a CommunityPost object with header url and author name", async () => {
    const mockedPost = {
      id: "post-1",
      type: CommunityPostType.CLIP,
      status: CommunityPostStatus.DRAFT,
      createdAt: new Date(),
      UpdatedAt: new Date(),
      title: "a",
      content: "a",
      authorId: "user-1",
      gameId: "1",
      author: {
        id: "user-1",
        name: "kenshin"
      },
      header: {
        postId: "post-1",
        type: ContentType.IMAGE,
        url: "linktoimage"
      }
    }

    const expectedData = {
      id: "post-1",
      type: CommunityPostType.CLIP,
      status: CommunityPostStatus.DRAFT,
      createdAt: new Date(),
      UpdatedAt: new Date(),
      title: "a",
      content: "a",
      authorName: "kenshin",
      header: mockedPost.header
    }

    const input = { id: "post-1" }
    prisma.communityPost.findUnique.mockResolvedValue(mockedPost)

    const ctx = {
      session: null,
      prisma
    }

    const caller = appRouter.createCaller(ctx)
    const post = await caller.guides.getById(input)

    expect(post).toStrictEqual(expectedData)
    expect(post.header).toStrictEqual(mockedPost.header)
  })
  it.todo("create should return a newly created CommunityPost object")
  it.todo("updateById should return a newly updated CommunityPost object")
})
