export class ApexStatisticsService {
    public static async apexAPI(eaName: string, auth: string, platform: string) {

        const res = await fetch(
            `https://api.mozambiquehe.re/bridge?auth=${auth}&player=${eaName}&platform=${platform}`
        );

        if (!res.ok) {
            throw new Error(`API returned error`);
        }

        const player = await res.json();

        const playerData: any = {
            "global": {
                "name": "",
                "uid": 0,
                "platform": "",
                "level": 0,
                "rank": {
                    "rankScore": 0,
                    "rankName": "",
                    "rankDiv": 0,
                },
                "arena": {
                    "rankScore": 0,
                    "rankName": "",
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
        playerData.global.name = player.global.name
        playerData.global.uid = player.global.uid
        playerData.global.platform = player.global.platform
        playerData.global.level = player.global.level
        playerData.global.rank.rankScore = player.global.rank.rankScore
        playerData.global.rank.rankName = player.global.rank.rankName
        playerData.global.rank.rankDiv = player.global.rank.rankDiv
        playerData.global.arena.rankScore = player.global.rank.rankScore
        playerData.global.arena.rankName = player.global.arena.rankName
        playerData.global.arena.rankDiv = player.global.arena.rankDiv
        playerData.legends.all = player.legends.all
        playerData.total.kills = player.total.kills

        return playerData
    }

}

