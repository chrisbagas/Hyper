export class PlayerStatisticsService {
    public static async valorantAPI(link:String) {
        const res = await fetch(
            "https://api.henrikdev.xyz/valorant/" + link
        );
        const data = await res.json();
        return data;
    };

    public static async getValorantAccountData(username: any, tagline: any) {
        return PlayerStatisticsService.valorantAPI(`v1/account/:${username}/:${tagline}`)
    };

    public static async  getValorantMMRData(username: any, tagline: any) {
        return PlayerStatisticsService.valorantAPI(`v2/mmr/ap/:${username}/:${tagline}`)
    };

    public static async  getValorantMMRHistory(username: any, tagline: any) {
        return PlayerStatisticsService.valorantAPI(`v1/mmr-history/ap/:${username}/:${tagline}`)
    };

    public static async  getValorantMatchHistory(username: any, tagline: any) {
        return PlayerStatisticsService.valorantAPI(`v3/matches/ap/:${username}/:${tagline}`)
    };
}