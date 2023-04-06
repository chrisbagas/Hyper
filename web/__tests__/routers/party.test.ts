import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import { PartyType, PartyVisibility } from "@prisma/client"
import prisma from "../../src/server/__mocks__/db";


vi.mock("../../src/server/db")

describe("Party RPC", () => {
    const mockParty = {
        id: "1", 
        gameId: "Valorant",
        partyTitle: "gaming",
        minimumRank: "iron",
        partyType: PartyType.Casual,
        partyVisibility: PartyVisibility.Public,
        discordInviteLink: "www.discord.com",
        game: {
            id: "Valorant"
        },
        partyMembers: []
    }

    const ctx = {
        session: null,
        prisma
    }
    const caller = appRouter.createCaller(ctx)

    it("getByGame positive test", async () => {
        prisma.party.findMany.mockResolvedValue(
            [mockParty]
        )
        
        const parties = await caller.party.getByGame({id: "Valorant"})

        expect(parties).toHaveLength(1)
        expect(parties[0]).toStrictEqual(mockParty)
    })
    
    it("getByGame negative test", async () => {
        prisma.party.findMany.mockResolvedValue(
            []
        )
        
        const parties = await caller.party.getByGame({id: "CSGO"})

        expect(parties).toHaveLength(0)
    })

    it("createParty positive test", async () => {
        prisma.party.create.mockResolvedValue(
            mockParty
        )

        const party = await caller.party.createParty({
            userId: "1",
            gameId: "Valorant",
            partyTitle: "gaming",
            partyType: PartyType.Casual,
            partyVisibility: PartyVisibility.Public
        })

        expect(party).toStrictEqual(mockParty)
    })

    it("createParty negative test", async () => {
        prisma.party.create.mockRejectedValue(
            new Error("duplicate error: same ID already exists")
        )

        expect(caller.party.createParty({
            userId: "1",
            gameId: "Valorant",
            partyTitle: "gaming",
            partyType: PartyType.Casual,
            partyVisibility: PartyVisibility.Public
        })).rejects.toThrowError("duplicate")
    })

    const mockPartyMember = {
        userId: "1",
        partyId: "1",
        gameId: "valorant",
    }

    const mockUser = {
        id: "1",
        email: "google@gmail.com",
        image: "amogus.png",
    }

    it("joinParty positive test", async () => {
        prisma.party.findUnique.mockResolvedValue(
            mockParty
        )

        prisma.user.findUnique.mockResolvedValue(
            mockUser
        )

        prisma.partyMember.create.mockResolvedValue(
            mockPartyMember
        )

        const partyMember = await caller.party.joinParty(
            mockPartyMember
        )

        expect(partyMember).toStrictEqual(mockPartyMember)
    })

    it("joinParty negative test", async () => {
        prisma.party.findUnique.mockRejectedValue(
            new Error("Error: Party not found")
        )

        expect(caller.party.joinParty(
            mockPartyMember
        )).rejects.toThrowError("not found")
    })

    it("leaveParty positive test", async () => {
        prisma.partyMember.delete.mockResolvedValue(
            mockPartyMember
        )

        const partyMember = await caller.party.leaveParty({
            userId: mockPartyMember.userId,
            partyId: mockPartyMember.partyId
        })

        expect(partyMember).toStrictEqual(
            mockPartyMember
        )
    })

    it("leaveParty negative test", async () => {
        prisma.partyMember.delete.mockRejectedValue(
            new Error("Error: party member not found")
        )
        
        expect(caller.party.leaveParty({
            userId: mockPartyMember.userId,
            partyId: mockPartyMember.partyId
        })).rejects.toThrowError("not found")
    })
})