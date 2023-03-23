import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import { User, Account, GameAccount, Game, Country } from "@prisma/client" 
import { Profile } from "../../src/server/api/services/ProfileService";
import prisma from "../../src/server/__mocks__/db";

vi.mock("../../src/server/db")

type UserMock = (User & {
    accounts: Account[];
    country: Country
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
    const mockedCountry = {
      localeCode: "id-ID",
      name: "Indonesia",
      imageUrl: "lala"
  }
    const ctx = {
      session: {
        user: {
          id: "TEST-1"
        }
      },
      prisma,
    }

    const mockedUser: UserMock = {
        id: "TEST-1",
        username: "Asyraf#6942",
        name: "Muhammad Asyraf",
        bio: null,
        image: "https://google.com/",
        countryCode: "id-ID",
        country: mockedCountry,
        accounts: [],
        GameAccount: [mockGameAccount]
    }
    const expectedProfile: Profile = {
        id: "TEST-1",
        username: "Asyraf#6942",
        bio: "No information provided",
        image: "https://google.com/",
        countryCode: "id-ID",
        country: mockedCountry,
        games: [mockGameAccount.game]
    }

    const input = { id: "TEST-1" };
    prisma.user.findUnique.mockResolvedValue(mockedUser)


    const caller = appRouter.createCaller(ctx)
    const profile = await caller.profiles.getProfile()

    expect(profile).toStrictEqual(expectedProfile)
    expect(profile.games.length).toBe(1)
    expect(profile.games[0]).toStrictEqual(mockGameAccount.game)
  })

  it("updateProfile should update the user's profile information", async () => {
    const ctx = {
      session: {
        user: {
          id: "TEST-1"
        }
      },
      prisma,
    }

    const input = {
      username: "Asyraf#6942",
      bio: "Updated bio",
      countryCode: "us-US"
    };

    const expectedUser = {
      id: "TEST-1",
      username: "Asyraf#6942",
      name: "Muhammad Asyraf",
      bio: "Updated bio",
      image: "https://google.com/",
      countryCode: "us-US",
      accounts: [],
      GameAccount: []
    };

    prisma.user.update.mockResolvedValue(expectedUser);

    const caller = appRouter.createCaller(ctx);
    await caller.profiles.updateProfile(input);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: ctx.session.user.id },
      data: {
        username: input.username,
        bio: input.bio,
        countryCode: input.countryCode
      },
    });
  });

  it("getCountrie shpould returns list of countries", async () => {
    
    const ctx = {
      session: {
        user: {
          id: "TEST-1"
        }
      },
      prisma,
    }

    const expectedCountries = [{
      localeCode: "id-ID",
      name: "Indonesia"
    }];

    prisma.country.findMany.mockResolvedValue(expectedCountries);
    const caller = appRouter.createCaller(ctx)
    const countries = await caller.profiles.getAllCountry()

    expect(countries).toStrictEqual(expectedCountries)
    expect(countries.length).toBe(1)
 
  })

  

})