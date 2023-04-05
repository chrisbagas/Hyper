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

export default function Home() {
    const router = useRouter()
    const gameId = router.query.game
    const { data: game } = api.games.getById.useQuery({ id: gameId as string })
    const parties = api.party.getByGame.useQuery({ id: gameId as string }).data
    const { data } = api.guides.getAllbyGame.useQuery({ id: gameId as string })
    const session = useSession()
    const userId = session.data?.user.id
    const userParty = api.party.getUserParty.useQuery(userId).data ?? null

    return <>
        <div className="p-16">
            <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
            <div className="flex justify-between items-center content-center my-6 text-neutral-0">
                <h1 className="text-3xl">
                    {userParty 
                        ? "Your Party:"
                        : "Find Parties that Suits You" 
                    }
                </h1>
                <div className="flex">
                    <Link href={"/" + gameId + "/party"}>View More </Link>
                    <ArrowRightIcon className="w-4 ml-2" />
                </div>
            </div>
            {userParty
                // render party details if user is in party
                ? <div className="p-4 bg-gray-800">
                    <div className="grid grid-cols-2">
                        <div className="grid grid-rows-2">
                            <div className="m-4">
                                <PartyCard
                                    userId={userId ?? ""}
                                    partyId={userParty.id}
                                    gameId={userParty.gameId}
                                    title={userParty.partyTitle}
                                    minimalRank={undefined}
                                    visibility={userParty?.partyVisibility ?? PartyVisibility.Public}
                                    type={userParty?.partyType ?? PartyType.Casual}
                                    partyMembers={userParty.partyMembers}
                                    alreadyJoined={true} 
                                />
                            </div>
                            <div className="m-4">
                                <PartyDetails 
                                    userId={userId ?? ""}
                                    partyId={userParty.id}
                                    partyMembers={userParty.partyMembers}
                                    title={userParty.partyTitle}
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
                                partyCapacity={userParty.game.teamCapacity}
                                partyMembers={userParty.partyMembers}
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
                                    minimalRank={undefined}
                                    visibility={party?.partyVisibility ?? PartyVisibility.Public}
                                    type={party?.partyType ?? PartyType.Casual}
                                    partyMembers={party.partyMembers}
                                    alreadyJoined={false} />
                            </div>
                        </>
                    })}
                </div>
            }
            <div className="flex justify-between items-center content-center my-6 text-neutral-0">
                <h1 className="text-3xl">Guides That Would Help</h1>
                <div className="flex">
                    <Link href={"/" + gameId + "/guides"}>View More </Link>
                    <ArrowRightIcon className="w-4 ml-2" />
                </div>
            </div>
            <div className="grid xl:grid-cols-2 grid-flow-row gap-8 content-center justify-center items-center my-6">
                {data?.slice(0, 4).map((guide) => {
                    return (
                        <GuideCard key={guide.id} title={guide.title} username={guide.author.name ?? ''} createdAt={guide.createdAt} content={guide.content ?? ''} status={guide.status} gameId={gameId as string} postId={guide.id} guidesLoc="guides" headerUrl={guide.header?.url as string} />
                    )
                })}
            </div>
        </div>
    </>
}