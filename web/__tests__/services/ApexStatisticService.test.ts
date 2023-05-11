import { describe, expect, it, vi } from "vitest"
import createFetchMock from "vitest-fetch-mock"
import { ApexStatisticsService } from "../../src/server/api/services/ApexStatisticsService";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe("Successfully Get Asyraf Apex statistic", () => {
    it("Get Asyraf Apex statistic", async () => {
        const mockPlayerData = {
            "global": {
                "name": "Rostova",
                "uid": 1010256005843,
                "platform": "PC",
                "level": 410,
                "rank": {
                    "rankScore": 4536,
                    "rankName": "Bronze",
                    "rankDiv": 4,
                },
                "arena": {
                    "rankScore": 0,
                    "rankName": "Unranked",
                    "rankDiv": 0,
                }
        
            },
            
            "legends": {
                "all": {}

            },
            "total": {
                "kills": {}
            }        
        }

        fetchMocker.mockResponseOnce(JSON.stringify(mockPlayerData))

        const playerData = await ApexStatisticsService.apexAPI("Rostova11","1329918c3cd5fa76db1c12defff3b945","PC")

        expect(playerData.global.name).toStrictEqual(mockPlayerData.global.name)
        expect(playerData.global.uid).toStrictEqual(mockPlayerData.global.uid)
        expect(playerData.global.platform).toStrictEqual(mockPlayerData.global.platform)
    })
    it("Get Asyraf Apex statistic", async () => {
        // Simulate error response from API
        fetchMocker.mockResponseOnce('', { status: 404 });

        try {
            await ApexStatisticsService.apexAPI("Rostova11","1329918c3cd5fa76db1c12defff3b945","PC");
        } catch (error) {
            expect(error.message).toBe('API returned error');
        }
    });
})