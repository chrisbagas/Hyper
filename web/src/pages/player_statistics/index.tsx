import { type NextPage } from "next";
// import { signIn, useSession } from "next-auth/react";
// import { api } from "../../utils/api";
import { PlayerStatisticsService } from "../../server/api/services/PlayerStatisticsService";
import { ValorantStatistic } from "../../components/PlayerStatistics/ValorantStatistic";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Temporary
import { status, accountData, mmrData, competitiveHistory } from "../../../public/temp/message.json"

const Statistic: NextPage = () => {

    const [valorantData, setValorantData] = useState({"status":0, "accountData":"", mmrData:"", competitiveHistory:[""]});
    const router = useRouter()
    const { id } = router.query
    const riot_id = Array.isArray(id) ? id[0]?.split(",") : id?.split(",");
    const username = riot_id?.[0]
    const tagline = riot_id?.[1]
  
    useEffect(() => {
      async function fetchData() {
        const data = await PlayerStatisticsService.getValorantData(username, tagline);
        setValorantData(data)
        console.log(data)
      }
      fetchData();
    }, []);

    return (
        <>
            <Head>
                <title>Hyper</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="m-8 ">
                
            {
                valorantData && valorantData.status && valorantData.accountData && valorantData.mmrData && valorantData.competitiveHistory &&
                <ValorantStatistic status={valorantData?.status} accountData={valorantData?.accountData} mmrData={valorantData?.mmrData} competitiveHistory={valorantData?.competitiveHistory}></ValorantStatistic>
            }   
 
            </div>
        </>
    );
};

export default Statistic;
