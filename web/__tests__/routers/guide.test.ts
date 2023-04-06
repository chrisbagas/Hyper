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

  it("create should return a success message and the post id if post is successfully created", async () => {
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
      message: "Post created successfully",
      id: mockPrismaOutput.id
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
    expect(value.id).toBe(expectedOutput.id)
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
    it("getAllbyGame should return List of all guides related to the game", async () => {
        const date = new Date()
        const mockedPost = {
            id: "1",
            name: "CSGO",
            logoUrl: "TEST",
            communityPosts:
            {
                id: "post-1",
                type: CommunityPostType.CLIP,
                status: CommunityPostStatus.DRAFT,
                createdAt: date,
                updatedAt: date,
                title: "a",
                content: "a",
                authorId: "user-1",
                gameId: "1",
                header: {
                    postId: "clf16d8u90000j7c49filreet",
                    type: "IMAGE",
                    url: "https://dafunda.com/wp-content/uploads/2021/03/CSGO-steam-terhapus.jpg"
                },
                author: {
                    id: "user-1",
                    email: "bagaslpt.2@gmail.com",
                    image: "https://cdn.discordapp.com/avatars/147326669911359488/1146bc24e6a581703f0ca27c08b07397.png",
                    bio: null,
                    countryCode: null,
                    emailVerified: null,
                    name: "ChrisXTRM",
                    username: null
                }
            }
        }

        const expectedData = {
            id: "post-1",
            type: CommunityPostType.CLIP,
            status: CommunityPostStatus.DRAFT,
            createdAt: date,
            updatedAt: date,
            title: "a",
            content: "a",
            authorId: "user-1",
            gameId: "1",
            header: {
                postId: "clf16d8u90000j7c49filreet",
                type: "IMAGE",
                url: "https://dafunda.com/wp-content/uploads/2021/03/CSGO-steam-terhapus.jpg"
            },
            author: {
                id: "user-1",
                email: "bagaslpt.2@gmail.com",
                image: "https://cdn.discordapp.com/avatars/147326669911359488/1146bc24e6a581703f0ca27c08b07397.png",
                bio: null,
                countryCode: null,
                emailVerified: null,
                name: "ChrisXTRM",
                username: null
            }
        }

        const input = { id: "1" }
        prisma.game.findUnique.mockResolvedValue(mockedPost)

        const ctx = {
            session: null,
            prisma
        }

        const caller = appRouter.createCaller(ctx)
        const post = await caller.guides.getAllbyGame(input)

        expect(post).toStrictEqual(expectedData)
    })

    it("getAllbyGame should throw error when game not found", async () => {
        const input = { id: "2" }

        prisma.game.findUnique.mockResolvedValue(null)

        const ctx = {
            session: null,
            prisma
        }

        const caller = appRouter.createCaller(ctx)

        await expect(caller.guides.getAllbyGame(input)).rejects.toThrowError("Game not found")
    })

    it("getAllbyUser should return List of all guides related to the game and user", async () => {
        const date = new Date()

        const mockedPost = {
            communityPosts:
                [{
                    id: "post-1",
                    type: CommunityPostType.CLIP,
                    status: CommunityPostStatus.PUBLISHED,
                    createdAt: date,
                    updatedAt: date,
                    title: "a",
                    content: "a",
                    authorId: "user-1",
                    gameId: "1",
                    header: {
                        postId: "clf16d8u90000j7c49filreet",
                        type: "IMAGE",
                        url: "https://dafunda.com/wp-content/uploads/2021/03/CSGO-steam-terhapus.jpg"
                    },
                    author: {
                        id: "user-1",
                        email: "bagaslpt.2@gmail.com",
                        image: "https://cdn.discordapp.com/avatars/147326669911359488/1146bc24e6a581703f0ca27c08b07397.png",
                        bio: null,
                        countryCode: null,
                        emailVerified: null,
                        name: "ChrisXTRM",
                        username: null
                    }

                }, {
                    id: "post-2",
                    type: CommunityPostType.CLIP,
                    status: CommunityPostStatus.DRAFT,
                    createdAt: date,
                    updatedAt: date,
                    title: "a",
                    content: "a",
                    authorId: "user-1",
                    gameId: "1",
                    header: {
                        postId: "clf16d8u90000j7c49filreet",
                        type: "IMAGE",
                        url: "https://dafunda.com/wp-content/uploads/2021/03/CSGO-steam-terhapus.jpg"
                    },
                    author: {
                        id: "user-1",
                        email: "bagaslpt.2@gmail.com",
                        image: "https://cdn.discordapp.com/avatars/147326669911359488/1146bc24e6a581703f0ca27c08b07397.png",
                        bio: null,
                        countryCode: null,
                        emailVerified: null,
                        name: "ChrisXTRM",
                        username: null
                    }

                }
            ]
        }

        const expectedData = [{
            id: "post-1",
            type: CommunityPostType.CLIP,
            status: CommunityPostStatus.PUBLISHED,
            createdAt: date,
            updatedAt: date,
            title: "a",
            content: "a",
            authorId: "user-1",
            gameId: "1",
            header: {
                postId: "clf16d8u90000j7c49filreet",
                type: "IMAGE",
                url: "https://dafunda.com/wp-content/uploads/2021/03/CSGO-steam-terhapus.jpg"
            },
            author: {
                id: "user-1",
                email: "bagaslpt.2@gmail.com",
                image: "https://cdn.discordapp.com/avatars/147326669911359488/1146bc24e6a581703f0ca27c08b07397.png",
                bio: null,
                countryCode: null,
                emailVerified: null,
                name: "ChrisXTRM",
                username: null

            }
        }, {
            id: "post-2",
            type: CommunityPostType.CLIP,
            status: CommunityPostStatus.DRAFT,
            createdAt: date,
            updatedAt: date,
            title: "a",
            content: "a",
            authorId: "user-1",
            gameId: "1",
            header: {
                postId: "clf16d8u90000j7c49filreet",
                type: "IMAGE",
                url: "https://dafunda.com/wp-content/uploads/2021/03/CSGO-steam-terhapus.jpg"
            },
            author: {
                id: "user-1",
                email: "bagaslpt.2@gmail.com",
                image: "https://cdn.discordapp.com/avatars/147326669911359488/1146bc24e6a581703f0ca27c08b07397.png",
                bio: null,
                countryCode: null,
                emailVerified: null,
                name: "ChrisXTRM",
                username: null

            }
        }]

        const input = { gameId: "1", userId: "user-1" }
        prisma.game.findUnique.mockResolvedValue(mockedPost)

        const ctx = {
            session: null,
            prisma
        }

        const caller = appRouter.createCaller(ctx)
        const post = await caller.guides.getAllbyUser(input)

        expect(post).toStrictEqual(expectedData)
    })

    it("getAllbyUser should throw error when game not found", async () => {
        const input = { gameId: "1", userId: "user-1" }

        prisma.game.findUnique.mockResolvedValue(null)

        const ctx = {
            session: null,
            prisma
        }

        const caller = appRouter.createCaller(ctx)

        await expect(caller.guides.getAllbyUser(input)).rejects.toThrowError("Game not found")
    })
})

