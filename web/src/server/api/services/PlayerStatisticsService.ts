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
        const matchHistory = await this.getValorantMatchHistory(username, tagline)

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
                "current_rank_image":"",
                "highest_rank":"",
                "highest_rank_image":""
            },
            "competitiveHistory": [
                
            ]
        }

        if (accountData.status == 200 && mmrData.status == 200 && mmrHistory.status == 200 && matchHistory.status == 200) {
            valorantData.status = 200
        }

        valorantData.accountData.region = accountData.data.region
        valorantData.accountData.account_level = accountData.data.account_level
        valorantData.accountData.name = accountData.data.name
        valorantData.accountData.tag = accountData.data.tag

        valorantData.mmrData.current_rank = mmrData.data.current_data.currenttierpatched
        valorantData.mmrData.elo = mmrData.data.current_data.elo
        valorantData.mmrData.current_rank_image = mmrData.data.current_data.images.large
        valorantData.mmrData.highest_rank = mmrData.data.highest_rank.patched_tier
        valorantData.mmrData.highest_rank_image = "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/" + mmrData.data.highest_rank.tier + "/largeicon.png"

        for (let i = 0; i < 5; i++) {
            const item = mmrHistory.data[i];
            let item2 = matchHistory.data[i].players.all_players;

            for (let j = 0; j < 10; j++) {
                if (item2[j].name === username && item2[j].tag === tagline) {
                    item2 = item2[j]
                    break
                }
            }
            
            const player_team = item2.team.toLowerCase()
            const teams = matchHistory.data[i].teams
            const victory_boolean = teams[player_team].has_won
            const rounds_won = teams[player_team].rounds_won
            const rounds_lost = teams[player_team].rounds_lost

            valorantData.competitiveHistory.push({
                "rank": item.currenttierpatched,
                "rank_image": item.images.large,
                "elo_change": item.mmr_change_to_last_game,
                "map_name": matchHistory.data[i].metadata.map,
                "kills": item2.stats.kills,
                "deaths": item2.stats.deaths,
                "assists": item2.stats.assists,
                "kd": Math.round(item2.stats.kills / item2.stats.deaths * 10) / 10,
                "headshot_rate": Math.round(item2.stats.headshots / (item2.stats.headshots + item2.stats.bodyshots + item2.stats.legshots) * 100),
                "agent_image": item2.assets.agent.small,
                "victory": victory_boolean,
                "rounds_won": rounds_won,
                "rounds_lost": rounds_lost
            });

        }

        return valorantData
    }

    public static async getValorantMatchData(match_id: any) {
        return PlayerStatisticsService.valorantAPI(`v2/match/${match_id}`)
    }

    public static async getValorantMatchDetails(username: any, tagline: any, match_id: any) {
        const matchData = await this.getValorantMatchData(match_id)

        const valorantMatchDetails: any = {
            "status":-1,
            "map_name":"",
            "friendly_team_score":"",
            "enemy_team_score":"",
            "friendly_team_members": [

            ],
            "enemy_team_members": [

            ],
        }

        if (matchData.status = 200) {
            valorantMatchDetails.status = 200
        }
        valorantMatchDetails.map_name = matchData.data.metadata.map

        const all_players_data = matchData.data.players.all_players
        const red_team_members = []
        const blue_team_members = []
        let user_team = ""
        // Get data of each player on a team
        for (let i = 0; i < 10; i++) {
            const player_data = all_players_data[i]
            const player_team = player_data.team.toLowerCase()

            const player_data_modified: any = {}
            player_data_modified.name = player_data.name
            player_data_modified.tag = player_data.tag
            player_data_modified.rank = player_data.currenttier_patched
            player_data_modified.rank_image = "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/" + player_data.currenttier + "/largeicon.png",
            player_data_modified.kills = player_data.stats.kills
            player_data_modified.deaths = player_data.stats.deaths 
            player_data_modified.assists = player_data.stats.assists
            player_data_modified.kd = Math.round(player_data.stats.kills / player_data.stats.deaths * 100) / 100
            player_data_modified.headshot_rate = Math.round(player_data.stats.headshots / (player_data.stats.headshots + player_data.stats.bodyshots + player_data.stats.legshots) * 100)
            player_data_modified.agent_image = player_data.assets.agent.small 

            if (player_team === "red") {
                red_team_members.push(player_data_modified)
            }
            else {
                blue_team_members.push(player_data_modified)
            }

            if (player_data.name === username && player_data.tag === tagline) {
                user_team = player_team
            }
        }

        if (user_team === "red") {
            valorantMatchDetails.friendly_team_members = red_team_members
            valorantMatchDetails.friendly_team_score = matchData.data.teams.red.rounds_won
            valorantMatchDetails.enemy_team_members = blue_team_members
            valorantMatchDetails.enemy_team_score = matchData.data.teams.blue.rounds_won
        }
        else {
            valorantMatchDetails.friendly_team_members = blue_team_members
            valorantMatchDetails.friendly_team_score = matchData.data.teams.blue.rounds_won
            valorantMatchDetails.enemy_team_members = red_team_members
            valorantMatchDetails.enemy_team_score = matchData.data.teams.red.rounds_won
        }

        // Custom sorting function based on the 'kd' property
        const sort_by_kd = (a: { kd: number; }, b: { kd: number; }) => b.kd - a.kd;

        // Sort both arrays by kd
        const sorted_array_1 = valorantMatchDetails.friendly_team_members.sort(sort_by_kd)
        const sorted_array_2 = valorantMatchDetails.enemy_team_members.sort(sort_by_kd)

        valorantMatchDetails.friendly_team_members = sorted_array_1
        valorantMatchDetails.enemy_team_members = sorted_array_2

        return valorantMatchDetails
    }
}