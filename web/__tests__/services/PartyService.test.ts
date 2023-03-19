import { describe, expect, it, vi } from "vitest"
import prisma from "../../src/server/__mocks__/db";
import { PartyService } from "../../src/server/api/services/PartyService";
import { PartyVisibility, PartyType, GameAccount, PartyMemberLevel } from "@prisma/client";

describe("Party Service", () => {
    const mockParty = {
        id: "1", 
        gameId: "Valorant",
        partyTitle: "gaming",
        minimumRank: "iron",
        partyType: PartyType.Casual,
        partyVisibility: PartyVisibility.Public,
        discordInviteLink: "www.discord.com",
        partyMembers: [
            {
                userId: "2",
                partyId: "1",
                gameId: "Valorant",
                level: PartyMemberLevel.leader,
                user: {
                    id: "2"
                },
                party: {
                    id: "1"
                }
            },
            {
                userId: "1",
                partyId: "1",
                gameId: "Valorant",
                level: PartyMemberLevel.member,
                user: {
                    id: "1"
                },
                party: {
                    id: "1"
                }
            },
        ]
    }

    const data = {
        gameId: "Valorant",
        partyTitle: "gaming",
        minimumRank: "iron",
        partyType: PartyType.Casual,
        partyVisibility: PartyVisibility.Public
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

    it("createParty positive test", async () => {
        prisma.party.create.mockResolvedValue(
            mockParty
        )

        const party = await PartyService.createParty(
            prisma,
            data
        )

        expect(party).toStrictEqual(mockParty)
    })

    it("createParty negative test", async () => {
        prisma.party.create.mockRejectedValue(
            new Error("duplicate error: same ID already exists")
        )
        
        expect(PartyService.createParty(
            prisma,
            data
        )).rejects.toThrowError("duplicate")
    })

    const mockPartyMember = {
        userId: "1",
        partyId: "1",
        gameId: "valorant",
    }

    it("joinParty positive test", async () => {
        prisma.party.findUnique.mockResolvedValue(
            mockParty
        )

        prisma.partyMember.create.mockResolvedValue(
            mockPartyMember
        )

        const partyMember = await PartyService.joinParty(
            prisma,
            mockPartyMember
        )

        expect(partyMember).toStrictEqual(mockPartyMember)
    })

    it("joinParty negative test", async () => {
        prisma.party.findUnique.mockResolvedValue(
            mockParty
        )
        
        prisma.partyMember.create.mockRejectedValue(
            new Error("Error: Party not found")
        )
        
        expect(PartyService.joinParty(
            prisma,
            mockPartyMember
        )).rejects.toThrowError("not found")
    })
})
