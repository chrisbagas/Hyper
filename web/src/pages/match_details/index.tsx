import { type NextPage } from "next";
// import { signIn, useSession } from "next-auth/react";
// import { api } from "../../utils/api";
import { PlayerStatisticsService } from "../../server/api/services/PlayerStatisticsService";
import { ValorantMatchDetail } from "../../components/PlayerStatistics/ValorantMatchDetail";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Temporary
// import { status1, map_name, friendly_team_score, enemy_team_score, friendly_team_members, enemy_team_members } from "../../../public/temp/match.json"


const Statistic: NextPage = () => {

  const [valorantMatchDetails, setValorantMatchDetails] = useState({ status: 1, map_name: "", friendly_team_score: 0, enemy_team_score: 0, friendly_team_members: [], enemy_team_members: [] });
  const router = useRouter()
  const { match_id, id } = router.query
  const riot_id = Array.isArray(id) ? id[0]?.split(",") : id?.split(",");
  const username = riot_id?.[0]
  const tagline = riot_id?.[1]

  useEffect(() => {
    async function fetchData() {
      const data = await PlayerStatisticsService.getValorantMatchDetails(username, tagline, match_id);
      setValorantMatchDetails(data)
      console.log(data)
    }
    fetchData();
  }, []);


  return (
    <>
      <Head>
        <title>Hyper - Match Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="m-8 ">

        <ValorantMatchDetail status={valorantMatchDetails.status} map_name={valorantMatchDetails.map_name} friendly_team_score={valorantMatchDetails.friendly_team_score} enemy_team_score={valorantMatchDetails.enemy_team_score} friendly_team_members={valorantMatchDetails.friendly_team_members} enemy_team_members={valorantMatchDetails.enemy_team_members} />

      </div>
    </>
  );
};

export default Statistic;
