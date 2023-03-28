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

    const mockPartyFull = {
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
            {
                userId: "3",
                partyId: "1",
                gameId: "Valorant",
                level: PartyMemberLevel.member,
                user: {
                    id: "2"
                },
                party: {
                    id: "1"
                }
            },
            {
                userId: "4",
                partyId: "1",
                gameId: "Valorant",
                level: PartyMemberLevel.member,
                user: {
                    id: "4"
                },
                party: {
                    id: "1"
                }
            },
            {
                userId: "5",
                partyId: "1",
                gameId: "Valorant",
                level: PartyMemberLevel.member,
                user: {
                    id: "5"
                },
                party: {
                    id: "1"
                }
            },
        ]
    }

    const createPartyData = {
        userId: "1",
        gameId: "Valorant",
        partyTitle: "gaming",
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
            createPartyData
        )

        expect(party).toStrictEqual(mockParty)
    })

    it("createParty negative test", async () => {
        prisma.party.create.mockRejectedValue(
            new Error("duplicate error: same ID already exists")
        )
        
        expect(PartyService.createParty(
            prisma,
            createPartyData
        )).rejects.toThrowError("duplicate")
    })

    const mockPartyLeader = {
        userId: "1",
        partyId: "1",
        gameId: "valorant",
        level: PartyMemberLevel.leader
    }

    const mockPartyMember = {
        userId: "2",
        partyId: "2",
        gameId: "valorant",
        level: PartyMemberLevel.member
    }

    const mockUser = {
        id: "1",
        email: "google@gmail.com",
        image: "amogus.png",
        username: "gamer123",
        emailVerified: true,
        name: "bob",
        bio: "hello",
        countryCode: "id"
    }

    const mockUserInParty = {
        id: "1",
        email: "google@gmail.com",
        image: "amogus.png",
        username: "gamer123",
        emailVerified: true,
        name: "bob",
        bio: "hello",
        countryCode: "id",
        partyMember: {
            userId: "1",
            partyId: "1"
        }
    }

    const mockGame = {
        id: "valorant",
        name: "valorant",
        logoUrl: "valorant.png",
        teamCapacity: 5
    }

    it("joinParty positive test", async () => {
        prisma.party.findUnique.mockResolvedValue(
            mockParty
        )

        prisma.partyMember.create.mockResolvedValue(
            mockPartyMember
        )

        prisma.user.findUnique.mockResolvedValue(
            mockUser
        )

        prisma.game.findUnique.mockResolvedValue(
            mockGame
        )

        const partyMember = await PartyService.joinParty(
            prisma,
            mockPartyMember
        )

        expect(partyMember).toStrictEqual(mockPartyMember)
    })

    it("joinParty negative test: game not found", async () => {
        prisma.party.findUnique.mockResolvedValue(
            null
        )

        prisma.user.findUnique.mockResolvedValue(
            mockUser
        )

        prisma.game.findUnique.mockResolvedValue(
            null
        )

        expect(PartyService.joinParty(
            prisma,
            mockPartyMember
        )).rejects.toThrowError("Game not found")
    })

    it("joinParty negative test: party not found", async () => {
        prisma.party.findUnique.mockResolvedValue(
            null
        )

        prisma.user.findUnique.mockResolvedValue(
            mockUser
        )

        prisma.game.findUnique.mockResolvedValue(
            mockGame
        )
        
        expect(PartyService.joinParty(
            prisma,
            mockPartyMember
        )).rejects.toThrowError("Party not found")
    })

    it("joinParty negative test: party full", async () => {
        prisma.party.findUnique.mockResolvedValue(
            mockPartyFull
        )

        prisma.user.findUnique.mockResolvedValue(
            mockUser
        )

        prisma.game.findUnique.mockResolvedValue(
            mockGame
        )
        
        expect(PartyService.joinParty(
            prisma,
            mockPartyMember
        )).rejects.toThrowError("full")
    })

    it("joinParty negative test: user not found", async () => {
        prisma.party.findUnique.mockResolvedValue(
            mockParty
        )
        
        prisma.user.findUnique.mockResolvedValue(
            null
        )

        prisma.game.findUnique.mockResolvedValue(
            mockGame
        )
        
        expect(PartyService.joinParty(
            prisma,
            mockPartyMember
        )).rejects.toThrowError("not found")
    })

    it("joinParty negative test: user already in party", async () => {
        prisma.party.findUnique.mockResolvedValue(
            mockParty
        )
        
        prisma.user.findUnique.mockResolvedValue(
            mockUserInParty
        )

        prisma.game.findUnique.mockResolvedValue(
            mockGame
        )
        
        expect(PartyService.joinParty(
            prisma,
            mockPartyMember
        )).rejects.toThrowError("already in party")
    })

    it("leaveParty positive test", async () => {
        prisma.partyMember.delete.mockResolvedValue(
            mockPartyMember
        )

        const partyMember = await PartyService.leaveParty(
            prisma,
            {
                userId: mockPartyMember.userId,
                partyId: mockPartyMember.partyId
            }
        )

        expect(partyMember).toStrictEqual(mockPartyMember)
    })

    it("leaveParty negative test: party member not found", async () => {
        prisma.partyMember.delete.mockRejectedValue(
            new Error("Error: party member not found")
        )
        
        expect(PartyService.leaveParty(
            prisma,
            {
                userId: mockPartyMember.userId,
                partyId: mockPartyMember.partyId
            }
        )).rejects.toThrowError("not found")
    })

    it("updateParty positive test", async () => {
        prisma.partyMember.findUnique.mockResolvedValue(
            mockPartyLeader
        )

        prisma.party.update.mockResolvedValue(
            mockParty
        )

        const party = PartyService.updateParty(
            prisma,
            {
                partyId: "1",
                userId: "1",
                partyTitle: "gaming",
                partyType: PartyType.Casual,
                partyVisibility: PartyVisibility.Public,
            }
        )

        expect(party).toStrictEqual(mockParty)
    })

    it("updateParty negative test: user not found", async () => {
        prisma.partyMember.findUnique.mockResolvedValue(
            null
        )

        expect(PartyService.updateParty(
            prisma,
            {
                partyId: "1",
                userId: "1",
                partyTitle: "gaming",
                partyType: PartyType.Casual,
                partyVisibility: PartyVisibility.Public,
            }
        )).rejects.toThrowError("not found")
    })

    it("updateParty negative test: permission denied", async () => {
        prisma.partyMember.findUnique.mockResolvedValue(
            mockPartyMember
        )

        expect(PartyService.updateParty(
            prisma,
            {
                partyId: "1",
                userId: "2",
                partyTitle: "gaming",
                partyType: PartyType.Casual,
                partyVisibility: PartyVisibility.Public,
            }
        )).rejects.toThrowError("denied")
    })
})
