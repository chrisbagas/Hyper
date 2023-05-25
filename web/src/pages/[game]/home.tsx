import React from "react";

import { GameDashboardNav } from "../../components/shared/GameDashboard/GameDashboardNav";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { PartyCard } from "../../components/party/PartyCard";
import { useSession } from "next-auth/react";
import { PartyType, PartyVisibility } from "@prisma/client";
import { GuideCard } from "../../components/Guide/GuideCard";
import { PartyPlayerList } from "../../components/party/PartyPlayerList";
import { PartyDetails } from "../../components/party/PartyDetails";
import { useGlobalLoader } from "../../components/shared/Loader";

export default function Home() {
  const router = useRouter()
  const gameId = router.query.game
  const { data: game, isLoading: gameIsLoading } = api.games.getById.useQuery({ id: gameId as string })
  const parties = api.party.getByGame.useQuery({ id: gameId as string }).data
  const { data, isLoading: guideIsLoading } = api.guides.getAllbyGame.useQuery({ id: gameId as string })
  const session = useSession()
  const userId = session.data?.user.id ?? ""
  const { data: userParty, isLoading: userPartyIsLoading, refetch } = api.party.getUserParty.useQuery(userId)

  const { setLoadingStates } = useGlobalLoader()
  React.useEffect(() => {
    setLoadingStates([gameIsLoading, guideIsLoading, userPartyIsLoading])
  }, [gameIsLoading, guideIsLoading, userPartyIsLoading])

  return <>
    <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
    <div className="px-8 py-8 lg:px-16">
      <div className="flex justify-between items-center content-center my-6 text-neutral-0">
        <h1 className="text-3xl font-bold">
          {userParty
            ? "Party Dashboard"
            : "Find Party that Suits You"
          }
        </h1>
        <div className="flex">
          <Link href={"/" + gameId + "/party"}>View More </Link>
          <ArrowRightIcon className="w-4 ml-2" />
        </div>
      </div>
      {userParty
        // render party details if user is in party
        ? <div className="p-4 bg-gray-800 rounded-xl">
          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <div className="m-4">
                <PartyCard
                  userId={userId}
                  partyId={userParty.id}
                  gameId={userParty.gameId}
                  title={userParty.partyTitle}
                  partyCapacity={userParty.game.teamCapacity}
                  totalRank={userParty?.totalRank}
                  totalConnected={userParty?.totalConnect}
                  visibility={userParty?.partyVisibility ?? PartyVisibility.Public}
                  type={userParty?.partyType ?? PartyType.Casual}
                  partyMembers={userParty.partyMembers}
                  alreadyJoined={true}
                  refetch={refetch}
                />
              </div>
              <div className="m-4">
                <PartyDetails
                  userId={userId ?? ""}
                  partyId={userParty.id}
                  partyMembers={userParty.partyMembers}
                  title={userParty.partyTitle}
                  game={userParty.game}
                  minimalRank={undefined}
                  averageRank={undefined}
                  averageKDR={undefined}
                  averageWinrate={undefined}
                  discordVoiceLink={userParty.discordInviteLink ?? undefined}
                  discordVoiceID={undefined}
                />
              </div>
            </div>
            <div className="m-4">
              <PartyPlayerList
                userId={userId ?? ""}
                partyId={userParty.id}
                partyCapacity={userParty.game.teamCapacity}
                partyMembers={userParty.partyMembers}
                refetch={refetch}
              />
            </div>
          </div>
        </div>
        // render party suggestions if user is not in party
        : <div className="flex flex-col md:grid md:grid-cols-2">
          {parties?.slice(0, 4).map(party => {
            return <>
              <div className="m-4">
                <PartyCard key={party.id} userId={userId ?? ''}
                  partyId={party.id}
                  gameId={party.gameId}
                  title={party.partyTitle}
                  partyCapacity={game?.teamCapacity as number}
                  totalRank={undefined}
                  totalConnected={undefined}
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
      }
      <div className="flex justify-between items-center content-center my-6 text-neutral-0">
        <h1 className="text-2xl font-bold">Guides That Would Help</h1>
        <div className="flex">
          <Link href={"/" + gameId + "/guides"}>View More </Link>
          <ArrowRightIcon className="w-4 ml-2" />
        </div>
      </div>
      <div className="grid xl:grid-cols-2 grid-flow-row gap-8 content-center justify-center items-center my-6 2xl:grid-cols-3">
        {data?.slice(0, 6).map((guide) => {
          return (
            <GuideCard key={guide.id} title={guide.title} username={guide.author.name ?? ''} createdAt={guide.createdAt} content={guide.content ?? ''} status={guide.status} gameId={gameId as string} postId={guide.id} guidesLoc="guides" headerUrl={guide.header?.url as string} />
          )
        })}
      </div>
    </div>
  </>
}
