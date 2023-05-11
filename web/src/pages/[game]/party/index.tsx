import { type NextPage } from "next";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { GameDashboardNav } from "../../../components/shared/GameDashboard/GameDashboardNav";
import { PartyCard } from "../../../components/party/PartyCard";
import { PartyType, PartyVisibility } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";

import { useGlobalLoader } from "../../../components/shared/Loader"

const Party: NextPage = () => {
  const router = useRouter()
  const session = useSession()

  const gameId = router.query.game
  const userId = session.data?.user.id
  const { data: game, isLoading: gameIsLoading } = api.games.getById.useQuery({ id: gameId as string })
  const parties = api.party.getByGame.useQuery({ id: gameId as string }).data
  const { data: userParty, refetch, isLoading: userPartyIsLoading } = api.party.getUserParty.useQuery(userId as string)

  const { setLoadingStates } = useGlobalLoader()
  React.useEffect(() => {
    setLoadingStates([gameIsLoading, userPartyIsLoading])
  }, [gameIsLoading, userPartyIsLoading])

  return (
    <>
      <div className="p-16">
        <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
        <div className="my-4">
          <div className=" flex justify-between mb-4 mr-4">
            <div>
              <h1 className="text-2xl font-bold mt-4 text-neutral-0">List Of All Parties</h1>
            </div>
            <div>
              {userParty
                ? <></>
                : <Link href={`/${gameId}/party/create`}>
                  <button className="btn bg-blue-500 hover:bg-blue-600 normal-case text-lg">
                    Create New Party
                    &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Link>
              }
            </div>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2">
            {parties?.map(party => {
              return <>
                <div className="m-4">
                  <PartyCard key={party.id}
                    userId={userId ?? ''}
                    partyId={party.id}
                    gameId={party.gameId}
                    title={party.partyTitle}
                    partyCapacity={game?.teamCapacity as number}
                    minimalRank={undefined}
                    visibility={party?.partyVisibility ?? PartyVisibility.Public}
                    type={party?.partyType ?? PartyType.Casual}
                    partyMembers={party.partyMembers}
                    alreadyJoined={false}
                    refetch={refetch}
                  />
                </div>
              </>
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Party;
