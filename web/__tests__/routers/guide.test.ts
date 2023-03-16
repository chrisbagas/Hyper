import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import { CommunityPostType, CommunityPostStatus } from "@prisma/client"

import prisma from "../../src/server/__mocks__/db";

vi.mock("../../src/server/db")

describe("Community Post RPC", () => {
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

