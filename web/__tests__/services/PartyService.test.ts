import { describe, expect, it, vi } from "vitest"
import prisma from "../../src/server/__mocks__/db";
import { PartyService } from "../../src/server/api/services/PartyService";
import { PartyVisibility, PartyType } from "@prisma/client";

describe("Party Service", () => {
    const mockParty = {
        id: "1", 
        gameId: "Valorant",
        partyTitle: "gaming",
        partyType: PartyType.Casual,
        partyVisibility: PartyVisibility.Public,
        discordInviteLink: "www.discord.com",
        partyMembers: []
    }

    const gameId: string = "Valorant";
    const partyTitle: string = "gaming";
    const partyType: PartyType = PartyType.Casual;
    const partyVisibility: PartyVisibility = PartyVisibility.Public;
    const data = {
        gameId: gameId,
        partyTitle: partyTitle,
        partyType: partyType,
        partyVisibility: partyVisibility
    }

    it("getParties positive test", async () => {
        prisma.party.findMany.mockResolvedValue(
            [mockParty]
        )
        
        const parties = await PartyService.getParties(prisma, "Valorant")

        expect(parties).toHaveLength(1)
        expect(parties[0]).toStrictEqual(mockParty)
    })

    it("getParties negative test", async () => {
        prisma.party.findMany.mockResolvedValue(
            []
        )
        
        const parties = await PartyService.getParties(prisma, "CSGO")

        expect(parties).toHaveLength(0)
    })

    it ("createParty positive test", async () => {
        prisma.party.create.mockResolvedValue(
            mockParty
        )

        const party = await PartyService.createParty(
            prisma,
            data
        )

        expect(party).toStrictEqual(mockParty)
    })

    it ("createParty negative test", async () => {
        prisma.party.create.mockRejectedValue(
            new Error("duplicate error: same ID already exists")
        )
        
        expect(PartyService.createParty(
            prisma,
            data
        )).rejects.toThrowError("duplicate")
    })
})
