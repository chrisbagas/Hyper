import { describe, expect, it, vi } from "vitest"
import prisma from "../../src/server/__mocks__/db";
import { User, Account, GameAccount, Game, Country } from "@prisma/client"
import { ProfileService, Profile } from "../../src/server/api/services/ProfileService";
import { DiscordService } from "../../src/server/api/services/DiscordService";

type UserMock = (User & {
    accounts: Account[];
    country: Country
    GameAccount: (GameAccount & {
        game: Game;
    })[];
})

vi.mock("../../src/server/api/services/DiscordService", () => {
    const expectedConnections = [
        {
            "type": "riotgames",
            "id": "1",
            "name": "Rostova#5722",
            "visibility": 0,
            "friend_sync": true,
            "show_activity": true,
            "verified": true,
            "two_way_link": false,
            "metadata_visibility": 1
        }
    ]

    const expectedDetails = {
        "id": "150579219057868802",
        "username": "Meta",
        "display_name": null,
        "avatar": "298b99f01f5f967db673b9801308c5ec",
        "avatar_decoration": null,
        "discriminator": "0147",
        "public_flags": 64,
        "flags": 64,
        "banner": null,
        "banner_color": null,
        "accent_color": null,
        "locale": "en-GB",
        "mfa_enabled": true,
        "premium_type": 0,
        "email": "tmgfaction@gmail.com",
        "verified": true
    }

    return {
        DiscordService: {
            getUserDetails: vi.fn().mockResolvedValue(expectedDetails),
            getUserConnections: vi.fn().mockResolvedValue(expectedConnections),
        }
    }
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

        const mockedCountry = {
            localeCode: "id-ID",
            name: "Indonesia",
            imageUrl: "lala"
        }

        const mockedUser: UserMock = {
            id: "TEST-1",
            username: "Asyraf#6942",
            name: "Muhammad Asyraf",
            bio: null,
            image: "https://google.com",
            countryCode: "id-ID",
            country: mockedCountry,
            accounts: [],
            GameAccount: [mockGameAccount]
        }



        const expectedProfile: Profile = {
            id: "TEST-1",
            username: "Asyraf#6942",
            bio: "No information provided",
            image: "https://google.com",
            countryCode: "id-ID",
            country: mockedCountry,
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
        const mockedCountry = {
            localeCode: "id-ID",
            name: "Indonesia",
            imageUrl: "lala"
        }

        const mockedUser: UserMock = {
            id: "TEST-1",
            name: "Muhammad Asyraf",
            bio: null,
            image: "https://google.com",
            countryCode: "id-ID",
            country: mockedCountry,
            accounts: [],
            GameAccount: [mockGameAccount]
        }

        const expectedProfile: Profile = {
            id: "TEST-1",
            username: "Muhammad Asyraf",
            bio: "No information provided",
            image: "https://google.com",
            countryCode: "id-ID",
            country: mockedCountry,
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
        const mockedCountry = {
            localeCode: "id-ID",
            name: "Indonesia",
            imageUrl: "lala"
        }

        const mockedUser: UserMock = {
            id: "TEST-1",
            username: "Asyraf#6942",
            name: "Muhammad Asyraf",
            bio: "Hello, World!",
            image: "https://google.com",
            countryCode: "id-ID",
            country: mockedCountry,
            accounts: [],
            GameAccount: []
        }

        const expectedProfile: Profile = {
            id: "TEST-1",
            username: "Asyraf#6942",
            bio: "Hello, World!",
            image: "https://google.com",
            countryCode: "id-ID",
            country: mockedCountry,
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
            "TEST-1", input
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

    it('getConnectionAccount should return the expected data', async () => {
        // Define mock data for the function's dependencies
        

        const game = { id: '1', name: 'Valorant', logoUrl: 'lala' };
        const gameAkun = {
            id: '1',
            userId: '12345',
            gameId: '1',
            gameIdentifier: 'Rostova#5722',
            statisticsData: null,
            statisticsLastUpdatedAt: null,
            createdAt: new Date(),
        };
        const gameAkuns = [gameAkun];

        const mockPrisma = prisma;

        

        // You can then use the mocked function in your tests
        const expectedConnections = [
            {
                "type": "riotgames",
                "id": "1",
                "name": "Rostova#5722",
                "visibility": 0,
                "friend_sync": true,
                "show_activity": true,
                "verified": true,
                "two_way_link": false,
                "metadata_visibility": 1
            }
        ];

        const connections = await DiscordService.getUserConnections("12345",mockPrisma);

        expect(connections).toStrictEqual(expectedConnections);

        prisma.game.findFirst.mockResolvedValue(game);
        prisma.gameAccount.upsert.mockResolvedValue(gameAkun);
        prisma.gameAccount.findMany.mockResolvedValue(gameAkuns);

        const data = await ProfileService.getConnectionAccount("12345",mockPrisma)
        const expectedData = { connected: expectedConnections, gameAkuns: gameAkuns };

        expect(data).toStrictEqual(expectedData)


    })

    
    it('getConnectionAccount should handle null game object and return expected data', async () => {
        // Define mock data for the function's dependencies
        

        const game = null;
        const gameAkun = {
            id: '1',
            userId: '12345',
            gameId: '1',
            gameIdentifier: 'Rostova#5722',
            statisticsData: null,
            statisticsLastUpdatedAt: null,
            createdAt: new Date(),
        };
        const gameAkuns = [gameAkun];

        const mockPrisma = prisma;

        

        // You can then use the mocked function in your tests
        const expectedConnections = [
            {
                "type": "riotgames",
                "id": "1",
                "name": "Rostova#5722",
                "visibility": 0,
                "friend_sync": true,
                "show_activity": true,
                "verified": true,
                "two_way_link": false,
                "metadata_visibility": 1
            }
        ];

        const connections = await DiscordService.getUserConnections("12345",mockPrisma);

        expect(connections).toStrictEqual(expectedConnections);

        prisma.game.findFirst.mockResolvedValue(game);
        prisma.gameAccount.upsert.mockResolvedValue(gameAkun);
        prisma.gameAccount.findMany.mockResolvedValue(gameAkuns);

        const data = await ProfileService.getConnectionAccount("12345",mockPrisma)
        const expectedData = { connected: expectedConnections, gameAkuns: gameAkuns };

    })




})