import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import { CommunityPostType, CommunityPostStatus} from "@prisma/client"

import prisma from "../../src/server/__mocks__/db";

vi.mock("../../src/server/db")

describe("Community Post RPC", () => {
    it("getAllbyGame should return List of all guides related to the game", async () => {
        const date = new Date()
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
})

