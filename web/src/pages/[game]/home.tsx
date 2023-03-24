import { GameDashboardNav } from "../../components/shared/GameDashboard/GameDashboardNav";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import Link from "next/link";
import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { PartyCard } from "../../components/party/PartyCard";
import { useSession } from "next-auth/react";
import { PartyType, PartyVisibility } from "@prisma/client";
import { GuideCard } from "../../components/Guide/GuideCard";

export default function GameSpecificDashboard() {
    const router = useRouter()
    const gameId = router.query.game
    const { data: game } = api.games.getById.useQuery({ id: gameId as string })
    const parties = api.party.getByGame.useQuery({ id: gameId as string }).data
    const { data } = api.guides.getAllbyGame.useQuery({ id: gameId as string })
    const session = useSession()
    const userId = session.data?.user.id
    console.log(parties)
    console.log(router.pathname)
    return <>
        <div className="p-16">
            <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
            {/* <div className="bg-base-1 rounded-md mt-4 text-neutral-0">
                <div className="collapse">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title ">
                        <div className="flex justify-between">
                            <div className="text-3xl">
                                Your Party
                            </div> 
                            <ChevronDownIcon className="w-4"/>
                        </div>
                    </div>
                    <div className="collapse-content rounded-md ">
                    </div>
                </div>
            </div> */}
            <div className="flex justify-between items-center content-center my-6 text-neutral-0">
                <h1 className="text-3xl">Find Parties that Suits You</h1>
                <div className="flex">
                    <Link href={"/" + router.pathname + "/parties"}>View More </Link>
                    <ArrowRightIcon className="w-4 ml-2" />
                </div>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2">
                {parties?.slice(0, 4).map(party => (
                    <PartyCard key={party.id} userId={userId ?? ''}
                        partyId={party.id}
                        gameId={party.gameId}
                        title={party.partyTitle}
                        minimalRank={undefined}
                        visibility={party?.partyVisibility ?? PartyVisibility.Public}
                        type={party?.partyType ?? PartyType.Casual}
                        partyMembers={party.partyMembers}
                        partyIsFull={party.partyMembers.length === 5} />
                ))}
            </div>
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