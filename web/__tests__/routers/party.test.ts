import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import { Party } from "@prisma/client"
import prisma from "../../src/server/__mocks__/db";

vi.mock("../../src/server/db")

describe("Party RPC", () => {
    it("getByGame should return parties of a game", async () => {
        const mockParty = {
            id: "1", 
            gameId: "Valorant",
            discordInviteLink: "www.discord.com",
            partyMembers: []
        }

        prisma.party.findMany.mockResolvedValue(
            [mockParty]
        )
        
        const ctx = {
            session: null,
            prisma
        }
        const caller = appRouter.createCaller(ctx)
        const parties = await caller.party.getByGame({id: "Valorant"})

        expect(parties).toHaveLength(1)
        expect(parties[0]).toStrictEqual(mockParty)
    })
})