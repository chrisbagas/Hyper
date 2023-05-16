import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import { PartyMemberLevel, PartyType, PartyVisibility } from "@prisma/client"
import prisma from "../../src/server/__mocks__/db";
import createFetchMock from "vitest-fetch-mock"

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

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

  it("getByGame positive test", async () => {


    const ctx = {
      session: {
        user: {
          id: "HELLO"
        }
      },
      prisma
    }
    const caller = appRouter.createCaller(ctx)
    prisma.party.findMany.mockResolvedValue(
      [mockParty]
    )

    const parties = await caller.party.getByGame({ id: "Valorant" })

    expect(parties).toHaveLength(1)
    expect(parties[0]).toStrictEqual(mockParty)
  })

  it("getByGame negative test", async () => {
    const ctx = {
      session: {
        user: {
          id: "HELLO"
        }
      },
      prisma
    }
    const caller = appRouter.createCaller(ctx)

    prisma.party.findMany.mockResolvedValue(
      []
    )

    const parties = await caller.party.getByGame({ id: "CSGO" })

    expect(parties).toHaveLength(0)
  })

  it("createParty positive test", async () => {
    fetchMocker.mockResponses(
      [
        JSON.stringify({
          inviteLink: "www.discord.com"
        }), { status: 200 }
      ],
      [
        "", { status: 204 }
      ]
    )

    const ctx = {
      session: {
        user: {
          id: "HELLO"
        }
      },
      prisma
    }
    const caller = appRouter.createCaller(ctx)

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
    const ctx = {
      session: {
        user: {
          id: "HELLO"
        }
      },
      prisma
    }
    const caller = appRouter.createCaller(ctx)

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

  it("getPartyMemberDetails test", async () => {
    const ctx = {
      session: {
        user: {
          id: "HELLO"
        }
      },
      prisma
    }
    const caller = appRouter.createCaller(ctx)

    prisma.user.findUnique.mockResolvedValue(
      mockUser
    )

    const user = await caller.party.getPartyMemberDetails(
      "1"
    )

    expect(user).toEqual(mockUser)
  })

  const mockPartyLeader = {
    userId: "1",
    partyId: "1",
    gameId: "valorant",
    level: PartyMemberLevel.leader
  }

  const mockPartyMember = {
    userId: "2",
    partyId: "1",
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
    countryCode: "id",
    accounts: [
      {
        providerAccountId: "105901925"
      }
    ]
  }

  const mockUserInParty = {
    ...mockUser,
    partyMember: mockPartyMember
  }

  const mockGame = {
    id: "valorant",
    name: "valorant",
    logoUrl: "valorant.png",
    teamCapacity: 5
  }

  it("getUserParty test", async () => {
    const ctx = {
      session: {
        user: {
          id: "HELLO"
        }
      },
      prisma
    }
    const caller = appRouter.createCaller(ctx)

    prisma.user.findUnique.mockResolvedValue(
      mockUserInParty
    )

    const party = await caller.party.getUserParty(
      "1"
    )

    expect(party).toStrictEqual(party)
  })

  it("joinParty positive test", async () => {
    const ctx = {
      session: {
        user: {
          id: "HELLO"
        }
      },
      prisma
    }
    const caller = appRouter.createCaller(ctx)

    prisma.party.findUnique.mockResolvedValue(
      mockParty
    )

    prisma.user.findUnique.mockResolvedValue(
      mockUser
    )

    prisma.game.findUnique.mockResolvedValue(
      mockGame
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
    const ctx = {
      session: {
        user: {
          id: "HELLO"
        }
      },
      prisma
    }
    const caller = appRouter.createCaller(ctx)

    prisma.party.findUnique.mockRejectedValue(
      new Error("Error: Party not found")
    )

    prisma.game.findUnique.mockResolvedValue(
      mockGame
    )

    expect(caller.party.joinParty(
      mockPartyMember
    )).rejects.toThrowError("not found")
  })

  it("leaveParty positive test", async () => {
    const ctx = {
      session: {
        user: {
          id: "HELLO"
        }
      },
      prisma
    }
    const caller = appRouter.createCaller(ctx)

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
    const ctx = {
      session: {
        user: {
          id: "HELLO"
        }
      },
      prisma
    }
    const caller = appRouter.createCaller(ctx)

    prisma.partyMember.delete.mockRejectedValue(
      new Error("Error: party member not found")
    )

    expect(caller.party.leaveParty({
      userId: mockPartyMember.userId,
      partyId: mockPartyMember.partyId
    })).rejects.toThrowError("not found")
  })

  it("updateParty test", async () => {
    const ctx = {
      session: {
        user: {
          id: "HELLO"
        }
      },
      prisma
    }
    const caller = appRouter.createCaller(ctx)

    prisma.partyMember.findUnique.mockResolvedValue(
      mockPartyLeader
    )

    prisma.party.update.mockResolvedValue(
      mockParty
    )

    const party = await caller.party.updateParty({
      partyId: "1",
      userId: "1",
      partyTitle: "gaming",
      partyType: PartyType.Casual,
      partyVisibility: PartyVisibility.Public,
    })

    expect(party).toStrictEqual(mockParty)
  })

  it("deleteParty test", async () => {
    const ctx = {
      session: {
        user: {
          id: "HELLO"
        }
      },
      prisma
    }
    const caller = appRouter.createCaller(ctx)

    prisma.partyMember.findUnique.mockResolvedValue(
      mockPartyLeader
    )

    prisma.party.delete.mockResolvedValue(
      mockParty
    )


    const party = await caller.party.deleteParty({
      partyId: "1",
      userId: "1",
    })

    expect(party).toStrictEqual(mockParty)
  })

  it("kickPartyMember test", async () => {
    const ctx = {
      session: {
        user: {
          id: "HELLO"
        }
      },
      prisma
    }
    const caller = appRouter.createCaller(ctx)

    prisma.partyMember.findFirst.mockResolvedValue(
      mockPartyLeader
    )

    prisma.partyMember.findUnique.mockResolvedValue(
      mockPartyMember
    )

    prisma.partyMember.delete.mockResolvedValue(
      mockPartyMember
    )

    const partyMember = await caller.party.kickPartyMember({
      leaderUserId: mockPartyLeader.userId,
      memberUserId: mockPartyMember.userId,
      partyId: "1"
    })

    expect(partyMember).toStrictEqual(mockPartyMember)
  })
})
