import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { CommunityPostType, CommunityPostStatus } from "@prisma/client"
import { GuideService } from "../../src/server/api/services/GuideService";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

import prisma from "../../src/server/__mocks__/db";

vi.mock("../../src/server/db")

describe("Community Post RPC", () => {
    it("getAll should return List of all guides", async () => {
        const date = new Date()
        const mockPrisma = prisma

        const mockedPost = {
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
            },
            game: {
                id: "1",
                name: "Valorant",
                logoUrl: "google.com",
                teamCapacity: "5"
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
            },
            game: {
                id: "1",
                name: "Valorant",
                logoUrl: "google.com",
                teamCapacity: "5"
            }
        }

        prisma.communityPost.findMany.mockResolvedValue(mockedPost)

        const post = await GuideService.getAll(1,1,mockPrisma)
        expect(post).toStrictEqual(expectedData)
    })

    it("getAllbyGame should return List of all guides related to the game", async () => {
        const date = new Date()
        const mockPrisma = prisma

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

        const input = "1"
        prisma.game.findUnique.mockResolvedValue(mockedPost)

        const post = await GuideService.getAllbyGame(input, mockPrisma)
        expect(post).toStrictEqual(expectedData)
    })

    it("getAllbyGame should throw error when game not found", async () => {
        const mockPrisma = prisma
        const input = "2"

        prisma.game.findUnique.mockResolvedValue(null)

        await expect(GuideService.getAllbyGame(input, mockPrisma)).rejects.toThrowError("Game not found")
    })

    it("getAllbyUser should return List of all guides related to the game and user", async () => {
        const date = new Date()
        const mockPrisma = prisma

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

        const input = "1"
        const userId = "user-1"
        prisma.game.findUnique.mockResolvedValue(mockedPost)

        const post = await GuideService.getAllbyUser(input, userId, mockPrisma)
        expect(post).toStrictEqual(expectedData)
    })

    it("getAllbyUser should throw error when game not found", async () => {
        const mockPrisma = prisma
        const input = "2"
        const userId = "user-1"

        prisma.game.findUnique.mockResolvedValue(null)

        await expect(GuideService.getAllbyUser(input, userId, mockPrisma)).rejects.toThrowError("Game not found")
    })
    it("updateStatusModerationById should return a success message if update is successful", async () => {
        const mockedPost = {
            id: "post-1",
            type: CommunityPostType.CLIP,
            status: CommunityPostStatus.PUBLISHED
        }
        const mockPrismaOutput = {
            id: "post-1",
            type: CommunityPostType.CLIP,
            status: CommunityPostStatus.TAKENDOWN
        }
        const expectedOutput = {
            message: "Post updated successfully"
        }

        prisma.communityPost.findUnique.mockResolvedValue(mockedPost)
        prisma.communityPost.update.mockResolvedValue(mockPrismaOutput)

        const value = await GuideService.updateStatusModerationById(
            "post-1",
            CommunityPostStatus.TAKENDOWN,
            prisma
        )

        expect(value.message).toBe(expectedOutput.message)
    })

    it("updateStatusModerationById should throw error when trying to update a draft post", async () => {
        const input = {
            id: "post-1",
            status: CommunityPostStatus.PUBLISHED,
            prisma: prisma
        }

        prisma.communityPost.findUnique.mockResolvedValue({
            id: "post-1",
            status: CommunityPostStatus.DRAFT
        })

        await expect(GuideService.updateStatusModerationById(input)).rejects.toThrowError()
    })
    it("updateStatusModerationById should throw error when trying to update to a draft post", async () => {
        const input = {
            id: "post-1",
            status: CommunityPostStatus.DRAFT,
            prisma: prisma
        }

        prisma.communityPost.findUnique.mockResolvedValue({
            id: "post-1",
            status: CommunityPostStatus.PUBLISHED
        })

        await expect(GuideService.updateStatusModerationById(input)).rejects.toThrowError()
    })
    it("updateStatusModerationById should throw error when trying to update a non exist post", async () => {
        const input = {
            id: "post-1",
            status: CommunityPostStatus.PUBLISHED,
            prisma: prisma
        }

        prisma.communityPost.findUnique.mockResolvedValue(null)

        await expect(GuideService.updateStatusModerationById(input)).rejects.toThrowError()
    })

    it("updateStatusModerationById should throw error when prisma related error has occured", async () => {
        const input = {
            id: "post-1",
            status: CommunityPostStatus.PUBLISHED,
            prisma: prisma
        }

        prisma.communityPost.findUnique.mockResolvedValue({
            id: "post-1",
            status: CommunityPostStatus.PUBLISHED
        })

        prisma.communityPost.update.mockRejectedValue(new PrismaClientUnknownRequestError("Unknown Error", { clientVersion: "4.9.0" }))

        await expect(GuideService.updateStatusModerationById(input)).rejects.toThrowError()
    })


    it("getAllbyTags should return List of all guides with the current tags", async () => {
    })

    it("getAllbyTags should throw error when no post with tags appear", async () => {
    })
})

