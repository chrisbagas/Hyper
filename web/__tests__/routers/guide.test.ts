import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import prisma from "../../src/server/__mocks__/db";
import { CommunityPostType, CommunityPostStatus, ContentType } from "@prisma/client"
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

vi.mock("../../src/server/db")

describe("Community Post RPC", () => {
  it("getPostById should return a CommunityPost object with header url and author name", async () => {
    const mockedPost = {
      id: "post-1",
      type: CommunityPostType.CLIP,
      status: CommunityPostStatus.DRAFT,
      createdAt: new Date(),
      updatedAt: new Date(),
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
      updatedAt: new Date(),
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
    const post = await caller.guides.getPostById(input)

    expect(post).toStrictEqual(expectedData)
    expect(post.header).toStrictEqual(mockedPost.header)
  })

  it("getPostById should throw error when post not found", async () => {
    const input = { id: "post-1" }

    prisma.communityPost.findUnique.mockResolvedValue(null)

    const ctx = {
      session: null,
      prisma
    }

    const caller = appRouter.createCaller(ctx)
    
    await expect(caller.guides.getPostById(input)).rejects.toThrowError("not found")
  })

  it("create should return a success message if post is successfully created", async () => {
    const input = {
      type: CommunityPostType.GUIDE,
      status: CommunityPostStatus.DRAFT,
      title: "title",
      content: "guide",
      headerType: ContentType.VIDEO,
      headerUrl: "url",
      gameId: "game-1"
    }
    
    // Prisma returning anythin mean the query is a success
    const mockPrismaOutput = {
      id: "a",
      type: CommunityPostType.GUIDE,
      status: CommunityPostStatus.DRAFT,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "title",
      content: "guide",
      authorId: "1",
      gameId: "game-1",
    }

    const expectedOutput = {
      message: "Post created successfully"
    }

    const ctx = {
      session: {
        user: {
          id: "1"
        }
      },
      prisma,
    }

    prisma.communityPost.create.mockResolvedValue(mockPrismaOutput)
    
    const caller = appRouter.createCaller(ctx)
    const value = await caller.guides.create(input)
    
    expect(value.message).toBe(expectedOutput.message)
  })

  it("create should throw error when prisma related error has occured", async () => {
    const input = {
      type: CommunityPostType.GUIDE,
      status: CommunityPostStatus.DRAFT,
      title: "title",
      content: "guide",
      headerType: ContentType.VIDEO,
      headerUrl: "url",
      gameId: "game-1"
    }

    const ctx = {
      session: {
        user: {
          id: "1"
        }
      },
      prisma,
    }

    prisma.communityPost.create.mockRejectedValue(new PrismaClientUnknownRequestError("Unknown Error", {clientVersion: "4.9.0"}))

    const caller = appRouter.createCaller(ctx)

    await expect(caller.guides.create(input)).rejects.toThrowError()
  })

  it("updatePostById should return a success message if update is successful", async () => {
    const input = {
      id: "post-1",
      type: CommunityPostType.GUIDE,
      status: CommunityPostStatus.DRAFT,
      title: "title new",
      content: "guide new",
      headerType: ContentType.VIDEO,
      headerUrl: "url new",
      gameId: "game-1"
    }

    const mockPrismaOutput = {
      id: "post-1",
      type: CommunityPostType.GUIDE,
      status: CommunityPostStatus.DRAFT,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "title new",
      content: "guide new",
      authorId: "1",
      gameId: "game-1",
    }

    const expectedOutput = {
      message: "Post updated successfully"
    }

    const ctx = {
      session: {
        user: {
          id: "1"
        }
      },
      prisma,
    }
    
    prisma.communityPost.findUnique.mockResolvedValue({type: CommunityPostStatus.DRAFT})
    prisma.communityPost.update.mockResolvedValue(mockPrismaOutput)

    const caller = appRouter.createCaller(ctx)
    const value = await caller.guides.updatePostById(input)

    expect(value.message).toBe(expectedOutput.message)
  })

  it("updatePostById should throw error when trying to update a published post", async () => {
    const input = {
      id: "post-1",
      type: CommunityPostType.GUIDE,
      status: CommunityPostStatus.DRAFT,
      title: "title new",
      content: "guide new",
      headerType: ContentType.VIDEO,
      headerUrl: "url new",
      gameId: "game-1"
    }

    const ctx = {
      session: {
        user: {
          id: "1"
        }
      },
      prisma,
    }

    prisma.communityPost.findUnique.mockResolvedValue({
      id: "post-1",
      status: CommunityPostStatus.PUBLISHED
    })

    const caller = appRouter.createCaller(ctx)
    
    await expect(caller.guides.updatePostById(input)).rejects.toThrowError()
  })

  it("updatePostById should throw error when trying to update a non exist post", async () => {
    const input = {
      id: "post-1",
      type: CommunityPostType.GUIDE,
      status: CommunityPostStatus.DRAFT,
      title: "title new",
      content: "guide new",
      headerType: ContentType.VIDEO,
      headerUrl: "url new",
      gameId: "game-1"
    }

    const ctx = {
      session: {
        user: {
          id: "1"
        }
      },
      prisma,
    }

    prisma.communityPost.findUnique.mockResolvedValue(null)

    const caller = appRouter.createCaller(ctx)
    
    await expect(caller.guides.updatePostById(input)).rejects.toThrowError()
  })

  it("updatePostById should throw error when prisma related error has occured", async () => {
    const input = {
      id: "post-1",
      type: CommunityPostType.GUIDE,
      status: CommunityPostStatus.DRAFT,
      title: "title new",
      content: "guide new",
      headerType: ContentType.VIDEO,
      headerUrl: "url new",
      gameId: "game-1"
    }

    const ctx = {
      session: {
        user: {
          id: "1"
        }
      },
      prisma,
    }

    prisma.communityPost.findUnique.mockResolvedValue({
      id: "post-1",
      status: CommunityPostStatus.DRAFT
    })
    prisma.communityPost.update.mockRejectedValue(new PrismaClientUnknownRequestError("Unknown Error", {clientVersion: "4.9.0"}))

    const caller = appRouter.createCaller(ctx)
    
    await expect(caller.guides.updatePostById(input)).rejects.toThrowError()
  })
})
