import { describe, expect, it, vi } from "vitest"
import prisma from "../../src/server/__mocks__/db";
import { PartyService } from "../../src/server/api/services/PartyService";
import { PartyVisibility, PartyType } from "@prisma/client";

describe("Party Service", () => {
    it("getParties positive test", async () => {
        const mockParty = {
            id: "1", 
            gameId: "Valorant",
            partyTitle: "gaming",
            partyType: PartyType.Casual,
            partyVisibility: PartyVisibility.Public,
            discordInviteLink: "www.discord.com",
            partyMembers: []
        }

        prisma.party.findMany.mockResolvedValue(
            [mockParty]
        )
        
        const parties = await PartyService.getParties(prisma, "Valorant")

        expect(parties).toHaveLength(1)
        expect(parties[0]).toStrictEqual(mockParty)
    })

    it("getParties negative test", async () => {
        const mockParty = {
            id: "1", 
            gameId: "Valorant",
            partyTitle: "gaming",
            partyType: PartyType.Casual,
            partyVisibility: PartyVisibility.Public,
            discordInviteLink: "www.discord.com",
            game: {
                id: "Valorant"
            },
            partyMembers: []
        }

        prisma.party.findMany.mockResolvedValue(
            []
        )
        
        
        const parties = await PartyService.getParties(prisma, "CSGO")

        expect(parties).toHaveLength(0)
    })
})
