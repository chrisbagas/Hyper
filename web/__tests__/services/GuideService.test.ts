import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { CommunityPostType, CommunityPostStatus } from "@prisma/client"
import { GuideService } from "../../src/server/api/services/GuideService";

import prisma from "../../src/server/__mocks__/db";

vi.mock("../../src/server/db")

describe("Community Post RPC", () => {
    it("getAllbyGame should return List of all guides related to the game", async () => {
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
        }

        const expectedData = {
            authorId: "user-1",
            id: "post-1",
            type: CommunityPostType.CLIP,
            status: CommunityPostStatus.DRAFT,
            createdAt: date,
            updatedAt: date,
            title: "a",
            content: "a",
            gameId: "1"
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
})

