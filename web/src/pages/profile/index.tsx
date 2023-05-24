import Head from "next/head";
import { api } from "../../utils/api";
import Link from "next/link";
import React, { useEffect } from "react"
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/solid"
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileCard } from "../../components/profile/ProfileCard";
import { useGlobalLoader } from "../../components/shared/Loader";
import { ProfileSkeleton } from "../../components/profile/ProfileSkeleton";

const Statistic = () => {
  const { data, isLoading, refetch } = api.profiles.getProfile.useQuery({});
  const connectAcc = api.profiles.getConnectionAccount.useQuery({});


  useEffect(() => {
    if (!isLoading) {
      refetch();
    }
  }, [isLoading]);

  const { setLoadingStates } = useGlobalLoader()

  useEffect(() => {
    setLoadingStates([isLoading, connectAcc.isLoading])
  }, [isLoading, connectAcc.isLoading])

  if (isLoading) {
    return (
      <ProfileSkeleton />
    )
  }

  return (
    <>
      <Head>
        <title>Hyper - Profile Page</title>
      </Head>
      <div className="flex justify-between mx-16 pt-8">
        <Link href="/"> <button className="flex btn btn-ghost normal-case gap-2 text-white"><ArrowLeftIcon className="w-4" /> Go Back</button> </Link>

        <Link href="/profile/edit"><button className="btn btn-primary bg-blue-700 normal-case flex gap-2 text-white"><PencilSquareIcon className="w-4" />Edit Profile</button></Link>


      </div>

      <div className="mx-16">
        <ProfileHeader data={data} connectAcc={connectAcc} />
        <div className="flex flex-nowrap tabs border-b border-base-4 my-4 overflow-x-auto ">

          <div
            className={`tab tab-lg cursor-pointer text-neutral-0 w-52 border-b-[2px] font-bold border-neutral-0`}
          >
            Overview
          </div>

        </div>
        <ProfileCard connectAcc={connectAcc} />
      </div>
    </>
  );
};

export default Statistic;
