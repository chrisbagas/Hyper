import { type NextPage } from "next";
import { GuideCard } from "../../../components/Guide/GuideCard";
import Link from "next/link";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { GameDashboardNav } from "../../../components/shared/GameDashboard/GameDashboardNav";


const Guides: NextPage = () => {
    const router = useRouter()
    const gameId = router.query.game
    const { data: game } = api.games.getById.useQuery({ id: gameId as string })
    const { data } = api.guides.getAllbyGame.useQuery({ id: gameId as string })
    console.log(data)

    return (
        <>
            <div className="p-16">
            <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
                <div className="flex justify-between items-center content-center my-6">
                    <h1 className="text-2xl font-bold text-white">See What Other Players Have Created</h1>
                    <Link href={`/${gameId}/your-guides/create`}><button className="btn bg-primary-main text-white">Create New Post &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    </button></Link>
                </div>
                <div className="flex justify-center my-2">
                    <div className="mb-3 w-full ">
                        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                            <input
                                type="search"
                                className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-base-3 bg-base-2 bg-clip-padding px-3 py-1.5 text-base font-normal outline-none transition duration-300 ease-in-out focus:border-primary focus:shadow-te-primary focus:outline-none"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="button-addon1" />
                            <button
                                className="btn"
                                type="button"
                                id="button-addon1"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-6 w-6">
                                    <path
                                        fill-rule="evenodd"
                                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <p className="text-white">Currently showing {data?.length} guides</p>
                    <div className="flex">
                        <p className="mx-2">Filter Result</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                        </svg>
                    </div>
                </div>
                <div className="grid xl:grid-cols-3 grid-flow-row gap-8 content-center justify-center items-center my-6">
                    {data?.map((guide) => {
                        return (
                            <GuideCard key={guide.id} title={guide.title} username={guide.author.name ?? ''} createdAt={guide.createdAt} content={guide.content ?? ''} status={guide.status} gameId={gameId as string} postId={guide.id} guidesLoc="guides" headerUrl={guide.header?.url as string}></GuideCard>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default Guides;
