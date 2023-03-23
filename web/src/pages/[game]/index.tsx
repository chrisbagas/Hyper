import { GameDashboardNav } from "../../components/shared/GameDashboard/GameDashboardNav";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import Link from "next/link";
import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export default function GameSpecificDashboard() {
    const router = useRouter()
    const gameId = router.query.game
    const { data: game } = api.games.getById.useQuery({ id: gameId as string })
    console.log(router.pathname)
    return <>
        <div className="p-14">
            <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
            <div className="bg-base-1 rounded-md mt-4 text-neutral-0">
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
            </div>
            <div className="flex justify-between items-center content-center my-6 text-neutral-0">
                <h1 className="text-3xl">Find Parties that Suits You</h1>
                <div className="flex">
                    <Link href={"/" + router.pathname + "/parties"}>View More </Link>
                    <ArrowRightIcon className="w-4 ml-2" />
                </div>
            </div>
            <div className="flex justify-between items-center content-center my-6 text-neutral-0">
                <h1 className="text-3xl">Guides That Would Help</h1>
                <div className="flex">
                    <Link href={"/" + router.pathname + "/parties"}>View More </Link>
                    <ArrowRightIcon className="w-4 ml-2" />
                </div>
            </div>
        </div>
    </>
}