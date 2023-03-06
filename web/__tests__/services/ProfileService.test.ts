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
            profileImage: "https://google.com",
            countryCode: "id-ID",
            accounts: [],
            GameAccount: [mockGameAccount]
        }

        const expectedProfile: Profile = {
            id: "TEST-1",
            username: "Asyraf#6942",
            bio: "Hello, World!",
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
            profileImage: "https://google.com",
            countryCode: "id-ID",
            accounts: [],
            GameAccount: []
        }

        const expectedProfile: Profile = {
            id: "TEST-1",
            username: "Asyraf#6942",
            bio: "Hello, World!",
            countryCode: "id-ID",
            games: []
        }

        const mockPrisma = prisma
        prisma.user.findUnique.mockResolvedValue(mockedUser)

        const profile = await ProfileService.getProfile("TEST-1", mockPrisma)

        expect(profile).toStrictEqual(expectedProfile)
        expect(profile.games.length).toBe(0)
    })
    it("getProfile should throw error if user null", async ()=>{
        const mockedUser = null
        const mockPrisma = prisma
        prisma.user.findUnique.mockResolvedValue(mockedUser)

        await expect( ProfileService.getProfile("TEST-1", mockPrisma)).rejects.toThrow()

    })
})