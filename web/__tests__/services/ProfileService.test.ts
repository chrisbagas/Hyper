import { describe, expect, it, vi } from "vitest"
import prisma from "../../src/server/__mocks__/db";
import { User, Account, GameAccount, Game } from "@prisma/client"
import { ProfileService, Profile } from "../../src/server/api/services/ProfileService";

type UserMock = (User & {
    accounts: Account[];
    GameAccount: (GameAccount & {
        game: Game;
    })[];
})

describe("Profile Service", () => {
    it("getProfile with connected games should return user profile with games", async () => {
        const mockGameAccount = {
            userId: "TEST-1",
            gameId: "1",
            gameIdentifier: "rostova",
            statisticsData: null,
            statisticsLastUpdatedAt: null,
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
            image: "https://google.com",
            countryCode: "id-ID",
            accounts: [],
            GameAccount: [mockGameAccount]
        }

        const expectedProfile: Profile = {
            id: "TEST-1",
            username: "Asyraf#6942",
            bio: "No information provided",
            image: "https://google.com",
            countryCode: "id-ID",
            games: [mockGameAccount.game]
        }

        const mockPrisma = prisma
        prisma.user.findUnique.mockResolvedValue(mockedUser)

        const profile = await ProfileService.getProfile("TEST-1", mockPrisma)

        expect(profile).toStrictEqual(expectedProfile)
        expect(profile.games.length).toBe(1)
        expect(profile.games[0]).toStrictEqual(mockGameAccount.game)
    })

    it("getProfile user without username should return name user", async () => {
        const mockGameAccount = {
            userId: "TEST-1",
            gameId: "1",
            gameIdentifier: "rostova",
            statisticsData: null,
            statisticsLastUpdatedAt: null,
            createdAt: new Date(),
            game: {
                id: "1",
                name: "valorant",
                logoUrl: "lala"
            }
        }

        const mockedUser: UserMock = {
            id: "TEST-1",
            name: "Muhammad Asyraf",
            bio: null,
            image: "https://google.com",
            countryCode: "id-ID",
            accounts: [],
            GameAccount: [mockGameAccount]
        }

        const expectedProfile: Profile = {
            id: "TEST-1",
            username: "Muhammad Asyraf",
            bio: "No information provided",
            image: "https://google.com",
            countryCode: "id-ID",
            games: [mockGameAccount.game]
        }

        const mockPrisma = prisma
        prisma.user.findUnique.mockResolvedValue(mockedUser)

        const profile = await ProfileService.getProfile("TEST-1", mockPrisma)

        expect(profile).toStrictEqual(expectedProfile)
        expect(profile.games.length).toBe(1)
        expect(profile.games[0]).toStrictEqual(mockGameAccount.game)
    })


    it("getProfile without connected games should return user profile without games", async () => {
        const mockedUser: UserMock = {
            id: "TEST-1",
            username: "Asyraf#6942",
            name: "Muhammad Asyraf",
            bio: "Hello, World!",
            image: "https://google.com",
            countryCode: "id-ID",
            accounts: [],
            GameAccount: []
        }

        const expectedProfile: Profile = {
            id: "TEST-1",
            username: "Asyraf#6942",
            bio: "Hello, World!",
            image: "https://google.com",
            countryCode: "id-ID",
            games: []
        }

        const mockPrisma = prisma
        prisma.user.findUnique.mockResolvedValue(mockedUser)

        const profile = await ProfileService.getProfile("TEST-1", mockPrisma)

        expect(profile).toStrictEqual(expectedProfile)
        expect(profile.games.length).toBe(0)
    })
    it("getProfile should throw error if user null", async () => {
        const mockedUser = null
        const mockPrisma = prisma
        prisma.user.findUnique.mockResolvedValue(mockedUser)

        await expect(ProfileService.getProfile("TEST-1", mockPrisma)).rejects.toThrow()

    })

    it("updateProfile should update user profile and return the updated profile", async () => {
        const mockGameAccount = {
            userId: "TEST-1",
            gameId: "1",
            gameIdentifier: "rostova",
            statisticsData: null,
            statisticsLastUpdatedAt: null,
            createdAt: new Date(),
            game: {
                id: "1",
                name: "valorant",
                logoUrl: "lala"
            }
        };

      

        const expectedProfile: Profile = {
            id: "TEST-1",
            username: "NewUsername",
            image: "https://google.com",
            bio: "Hello, World!",
            countryCode: "en-US",
            games: [mockGameAccount.game]
        };

        const input = {
            username: "NewUsername",
            bio: "Hello, World!",
            countryCode: "en-US"
        }

        const mockPrisma = prisma;
        prisma.user.update.mockResolvedValue(expectedProfile);

        const updatedProfile = await ProfileService.updateProfile(
            "TEST-1",input
            ,
            mockPrisma
        );
        expect(prisma.user.update).toHaveBeenCalledWith({
            where: { id: expectedProfile.id },
            data: {
              username: input.username,
              bio: input.bio,
              countryCode: input.countryCode
            },
          });

    });

    it("updateProfile should throw error if user null", async () => {
        const mockedUser = null;
        const mockPrisma = prisma;
        prisma.user.update.mockResolvedValue(mockedUser);

        await expect(
            ProfileService.updateProfile("TEST-1", {}, mockPrisma)
        ).rejects.toThrow();
    });
    
    
    it("getContries should return list of countries", async () => {
        const expectedCountries = [{
            localeCode: "id-ID",
            name: "Indonesia"
        }];
        const mockPrisma = prisma;
        prisma.country.findMany.mockResolvedValue(expectedCountries);
        const countries = await ProfileService.getAllCountries(mockPrisma)

        expect(countries).toStrictEqual(expectedCountries)
        expect(countries.length).toBe(1)
       
        
    });
    
})