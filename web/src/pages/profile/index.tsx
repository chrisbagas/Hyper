import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../../utils/api";
import Link from "next/link";
import React, { useEffect } from "react"
import { useSession } from "next-auth/react"
import { ArrowLeftIcon, PencilSquareIcon} from "@heroicons/react/24/solid"
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileCard } from "../../components/profile/ProfileCard";

const Statistic: NextPage = () => {
    const { data, refetch } = api.profiles.getProfile.useQuery()
    const connectAcc = api.profiles.getConnectionAccount.useQuery()
    const session = useSession()

    useEffect(() => {
        refetch()
    }, [session])

    

    return (
        <>
            <Head>
                <title>Hyper</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex justify-between mx-16 pt-8">
                <Link href="/"> <button className="flex btn btn-ghost normal-case gap-2 text-white"><ArrowLeftIcon className="w-4" /> Go Back</button> </Link>

                <Link href="/profile/edit"><button className="btn btn-primary bg-blue-700 normal-case flex gap-2 text-white"><PencilSquareIcon className="w-4" />Edit Profile</button></Link>


            </div>

            <div className="mx-16">
                <ProfileHeader data={data} connectAcc={connectAcc}/>
                <div className="tabs my-4 ">
                    <a className="tab tab-bordered tab-active">Overview</a>
                </div>
                <ProfileCard connectAcc={connectAcc}/>
            </div>
        </>
    );
};

export default Statistic;
