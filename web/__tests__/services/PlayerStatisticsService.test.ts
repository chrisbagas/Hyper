import { describe, expect, it, vi } from "vitest"
import { PlayerStatisticsService } from "../../src/server/api/services/PlayerStatisticsService"

/*
Nilai yang ditest hanya nilai yang tidak akan berubah. Hal-hal seperti level, banyak permainan tidak
diuji karena nilainya akan berubah ketika saya bermain Valorant. Jika test pass seharusnya sudah mewakili
bahwa API berjalan sesuai harapan.
*/

describe("Successfully Get Raka's Valorant Account Data, MMR History, Match History", () => {
    it("Get Raka's Valorant Account Data", async () => {
        const mockValorantAccountData = {
            status: 200,
            data: {
                name: "WAR RakaZet",
                tag: "yummy"
            }            
        }

        const valorantAccountData = await PlayerStatisticsService.getValorantAccountData("WAR RakaZet", "yummy")

        expect(valorantAccountData.status).toStrictEqual(mockValorantAccountData.status)
        expect(valorantAccountData.data.name).toStrictEqual(mockValorantAccountData.data.name)
        expect(valorantAccountData.data.tag).toStrictEqual(mockValorantAccountData.data.tag)
    })

    it("Get Raka's Valorant MMR Data", async () => {
        const mockValorantMMRData = {
            status: 200,
            data: {
                name: "WAR RakaZet",
                tag: "yummy",
                highest_rank: {
                    patched_tier: "Radiant",
                    season: "e5a3"
                },
                by_season: {
                    e1a1: {
                        wins: 12
                    }
                }
            }
        }

        const valorantMMRData = await PlayerStatisticsService.getValorantMMRData("WAR RakaZet", "yummy")

        expect(valorantMMRData.status).toStrictEqual(mockValorantMMRData.status)
        expect(valorantMMRData.data.name).toStrictEqual(mockValorantMMRData.data.name)
        expect(valorantMMRData.data.tag).toStrictEqual(mockValorantMMRData.data.tag)
        expect(valorantMMRData.data.highest_rank.patched_tier).toStrictEqual(mockValorantMMRData.data.highest_rank.patched_tier)
        expect(valorantMMRData.data.highest_rank.season).toStrictEqual(mockValorantMMRData.data.highest_rank.season)
        expect(valorantMMRData.data.by_season.e1a1.wins).toStrictEqual(mockValorantMMRData.data.by_season.e1a1.wins)
    })

    // Fitur ini mengambil match history terakhir. Sehingga kebanyakan data akan berubah setiap saya bermain Valorant.
    it("Get Raka's Valorant MMR History", async () => {
        const mockValorantMMRHistory = {
            status: 200,
            name: "WAR RakaZet",
            tag: "yummy"         
        }

        const valorantMMRHistory = await PlayerStatisticsService.getValorantMMRHistory("WAR RakaZet", "yummy")

        expect(valorantMMRHistory.status).toStrictEqual(mockValorantMMRHistory.status)
        expect(valorantMMRHistory.name).toStrictEqual(mockValorantMMRHistory.name)
        expect(valorantMMRHistory.tag).toStrictEqual(mockValorantMMRHistory.tag)
    })

    it("Get Raka's Valorant Match History", async () => {
        const mockValorantMatchHistory = {
            status: 200  
        }

        const valorantMatchHistory = await PlayerStatisticsService.getValorantMatchHistory("WAR RakaZet", "yummy")

        expect(valorantMatchHistory.status).toStrictEqual(mockValorantMatchHistory.status)
    })
})

describe("Getting Non Existent Valorant Account Data, MMR History, Match History Returns 404 Status Code", () => {
    it("Get Non Existent Valorant Account Data Returns 404 Status Code", async () => {
        const mockValorantAccountData = {
            status: 404
        }

        // Tag Valid Riot Acount Maksimal 5 Karakter
        const valorantAccountData = await PlayerStatisticsService.getValorantAccountData("WAR RakaZet", "yummyyy")

        expect(valorantAccountData.status).toStrictEqual(mockValorantAccountData.status)
    })

    it("Get Non Existent Valorant MMR Data Returns 404 Status Code", async () => {
        const mockValorantMMRData = {
            status: 404
        }

        // Tag Valid Riot Acount Maksimal 5 Karakter
        const valorantMMRData = await PlayerStatisticsService.getValorantMMRData("WAR RakaZet", "yummyyy")

        expect(valorantMMRData.status).toStrictEqual(mockValorantMMRData.status)
    })

    // Fitur ini mengambil match history terakhir. Sehingga kebanyakan data akan berubah setiap saya bermain Valorant.
    it("Get Non Existent Valorant MMR History Returns 404 Status Code", async () => {
        const mockValorantMMRHistory = {
            status: 404        
        }

        // Tag Valid Riot Acount Maksimal 5 Karakter
        const valorantMMRHistory = await PlayerStatisticsService.getValorantMMRHistory("WAR RakaZet", "yummyyy")

        expect(valorantMMRHistory.status).toStrictEqual(mockValorantMMRHistory.status)
    })

    it("Get Non Existent Valorant Match History Returns 404 Status Code", async () => {
        const mockValorantMatchHistory = {
            status: 404  
        }

        // Tag Valid Riot Acount Maksimal 5 Karakter
        const valorantMatchHistory = await PlayerStatisticsService.getValorantMatchHistory("WAR RakaZet", "yummyyy")

        expect(valorantMatchHistory.status).toStrictEqual(mockValorantMatchHistory.status)
    })
})

describe("Call Valorant's API Using The Wrong Parameter Returns 404 Status Code", () => {
    it("Should return error 404", async () => {
        const mockValorantAPIData = {
            status: 404
        }

        const valorantAPIData = await PlayerStatisticsService.valorantAPI({})

        expect(valorantAPIData.status).toStrictEqual(mockValorantAPIData.status)
    })
})

describe("Get Combined Valorant Data Successfully", () => {
    it("Should return combined Valorant data successfully", async () => {
        const mockValorantAPIData = {
            status: 200,
            accountData: {
                region: "ap",
                account_level: 34,
                name: "iRakaZet",
                tag: "5407"
            },
            mmrData: {
                current_rank: "Ascendant 2",
                elo: 1921,
                current_rank_image: "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/22/largeicon.png",
                highest_rank: "Ascendant 2",
                highest_rank_image: "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/22/largeicon.png",
            },
            competitiveHistory: [
                {
                    rank: "Ascendant 2",
                    rank_image: "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/22/largeicon.png",
                    elo_change: -14,
                    map_name: "Lotus",
                    kills: 22,
                    deaths: 18,
                    assists: 6,
                    kd: 1.2,
                    headshot_rate: 9,
                    agent_image: "https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png",
                    victory: false,
                    rounds_won: 11,
                    rounds_lost: 13
                },
                {
                    rank: "Ascendant 2",
                    rank_image: "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/22/largeicon.png",
                    elo_change: 25,
                    map_name: "Haven",
                    kills: 34,
                    deaths: 16,
                    assists: 8,
                    kd: 2.1,
                    headshot_rate: 16,
                    agent_image: "https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png",
                    victory: true,
                    rounds_won: 15,
                    rounds_lost: 13
                },
                {
                    rank: "Ascendant 2",
                    rank_image: "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/22/largeicon.png",
                    elo_change: 29,
                    map_name: "Icebox",
                    kills: 12,
                    deaths: 10,
                    assists: 6,
                    kd: 1.2,
                    headshot_rate: 15,
                    agent_image: "https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png",
                    victory: true,
                    rounds_won: 13,
                    rounds_lost: 4
                },
                {
                    rank: "Ascendant 1",
                    rank_image: "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/21/largeicon.png",
                    elo_change: 27,
                    map_name: "Split",
                    kills: 23,
                    deaths: 9,
                    assists: 11,
                    kd: 2.6,
                    headshot_rate: 34,
                    agent_image: "https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png",
                    victory: true,
                    rounds_won: 13,
                    rounds_lost: 6
                },
                {
                    rank: "Ascendant 1",
                    rank_image: "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/21/largeicon.png",
                    elo_change: 18,
                    map_name: "Haven",
                    kills: 21,
                    deaths: 8,
                    assists: 5,
                    kd: 2.6,
                    headshot_rate: 12,
                    agent_image: "https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png",
                    victory: true,
                    rounds_won: 13,
                    rounds_lost: 6
                },
            ]
        }

        const valorantAPIData = await PlayerStatisticsService.getValorantData("iRakaZet", "5407")

        expect(valorantAPIData).toStrictEqual(mockValorantAPIData)
    }, 20000)
})