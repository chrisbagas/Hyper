import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import { User, Account, GameAccount, Game } from "@prisma/client" 
import { Profile } from "../../src/server/api/services/ProfileService";
import prisma from "../../src/server/__mocks__/db";

vi.mock("../../src/server/db")

type UserMock = (User & {
    accounts: Account[];
    GameAccount: (GameAccount & {
        game: Game;
    })[];
})

describe("Profile RPC", () => {
  it("getProfile shpould returns profile with valid id", async () => {
    const mockGameAccount = {
        userId: "TEST-1",
        gameId: "1" ,
        gameIdentifier: "rostova" ,
        statisticsData: null,
        statisticsLastUpdatedAt:null ,
        createdAt: new Date(),
        game: {
            id: "1",
            name: "valorant",
            logoUrl: "lala"
        }
    }

    const mockedUser: UserMock = {
        id: "TEST-1",
        username: "Asyraf#6942",
        name: "Muhammad Asyraf",
        bio: null,
        profileImage: "https://google.com/",
        countryCode: "id-ID",
        accounts: [],
        GameAccount: [mockGameAccount]
    }
    const expectedProfile: Profile = {
        id: "TEST-1",
        username: "Asyraf#6942",
        bio: "No information provided",
        countryCode: "id-ID",
        games: [mockGameAccount.game]
    }

    const input = { id: "TEST-1" };
    prisma.user.findUnique.mockResolvedValue(mockedUser)

    const ctx = {
      session: null,
      prisma
    }

    const caller = appRouter.createCaller(ctx)
    const profile = await caller.profiles.getProfile(input)

    expect(profile).toStrictEqual(expectedProfile)
    expect(profile.games.length).toBe(1)
    expect(profile.games[0]).toStrictEqual(mockGameAccount.game)
  })
})