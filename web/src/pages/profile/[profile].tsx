
import { NextPage } from "next";
import Head from "next/head"

import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useEffect } from "react";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileCard } from "../../components/profile/ProfileCard";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";


const ShowProfile: NextPage = () => {
    const router = useRouter()
    const userId = router.query.profile

    const { data, isLoading, refetch } = api.profiles.getProfile.useQuery({userId: String(userId)});
    const connectAcc = api.profiles.getConnectionAccount.useQuery({userId: String(userId)});



    useEffect(() => {
        if (!isLoading) {
            refetch();
        }
    }, [isLoading]);

    if (isLoading) {
        return <div>Loading...</div>

    }


    return (
        <>
            <Head>
                <title>Hyper</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex justify-between mx-16 pt-8">
                <Link href="/"> <button className="flex btn btn-ghost normal-case gap-2 text-white"><ArrowLeftIcon className="w-4" /> Go Back</button> </Link>

            </div>

            <div className="mx-16">
                <ProfileHeader data={data} connectAcc={connectAcc}/>
                <div className="flex flex-nowrap tabs border-b border-base-4 my-4 overflow-x-auto ">
            
                        <div
                            className={`tab tab-lg cursor-pointer text-neutral-0 w-52 border-b-[2px] font-bold border-neutral-0`}
                        >
                            Overview
                        </div>
            
        </div>
                <ProfileCard connectAcc={connectAcc}/>
            </div>
        </>
    );

  
}

export default ShowProfile