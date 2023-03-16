export class PlayerStatisticsService {
    public static async valorantAPI(link: string) {
        const res = await fetch(
            "https://api.henrikdev.xyz/valorant/" + link
        );
        return res.json();
    }

    public static async getValorantAccountData(username: any, tagline: any) {
        return PlayerStatisticsService.valorantAPI(`v1/account/:${username}/:${tagline}`)
    }

    public static async  getValorantMMRData(username: any, tagline: any) {
        return PlayerStatisticsService.valorantAPI(`v2/mmr/ap/:${username}/:${tagline}`)
    }

    public static async  getValorantMMRHistory(username: any, tagline: any) {
        return PlayerStatisticsService.valorantAPI(`v1/mmr-history/ap/:${username}/:${tagline}`)
    }

    public static async  getValorantMatchHistory(username: any, tagline: any) {
        return PlayerStatisticsService.valorantAPI(`v3/matches/ap/:${username}/:${tagline}?filter=competitive`)
    }

    public static async getValorantData(username: any, tagline: any) {
        const accountData = await this.getValorantAccountData(username, tagline)
        const mmrData = await this.getValorantMMRData(username, tagline)
        const mmrHistory = await this.getValorantMMRHistory(username, tagline)

        const valorantData: any = {
            "status":-1,
            "accountData": {
                "region":"",
                "account_level":"",
                "name":"",
                "tag":"",
            },
            "mmrData": {
                "current_rank":"",
                "elo":0,
                "rank_image":""
            },
            "mmrHistory": [
                
            ]
        }

        valorantData.accountData.region = accountData.data.region
        valorantData.accountData.account_level = accountData.data.account_level
        valorantData.accountData.name = accountData.data.name
        valorantData.accountData.tag = accountData.data.tag

        valorantData.mmrData.current_rank = mmrData.data.current_data.currenttierpatched
        valorantData.mmrData.elo = mmrData.data.current_data.elo
        valorantData.mmrData.rank_image = mmrData.data.current_data.images.large

        var counter = 0
        for (var i in mmrHistory.data) {
            if (counter == 5) break

            var item = mmrHistory.data[i];

            valorantData.mmrHistory.push({
                "rank": item.currenttierpatched,
                "rank_image": item.images.large,
                "elo_change": item.mmr_change_to_last_game
            });

            counter++
        }

        return valorantData
    }
}