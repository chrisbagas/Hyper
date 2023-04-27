import React from "react";
import { type NextPage } from "next";
import { GuideCard } from "../../../components/Guide/GuideCard";
import Link from "next/link";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { GameDashboardNav } from "../../../components/shared/GameDashboard/GameDashboardNav";
import { FunnelIcon, PencilSquareIcon } from "@heroicons/react/24/solid";


const Guides: NextPage = () => {
  const router = useRouter()
  const gameId = router.query.game
  const { data: game } = api.games.getById.useQuery({ id: gameId as string })
  const [ tagId, setTagId ] = React.useState("")

  const { data } = api.guides.getAllbyGame.useQuery({ id: gameId as string, tagId })
  const tags = api.tag.getAll.useQuery()

  return (
    <>
      <div className="p-16">
        <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
        <div className="flex justify-between items-center content-center my-6">
          <h1 className="text-2xl font-bold text-white">See What Other Players Have Created</h1>
          <Link href={`/${gameId}/your-guides/create`}>
            <button className="btn bg-primary-main text-white">
              <span className="hidden lg:block">Create New Post &nbsp;</span>
              <PencilSquareIcon className="w-5 h-5" />
            </button>
          </Link>
        </div>
        <div className="flex justify-center my-2">
          <div className="mb-3 w-full">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <input
                type="search"
                className="text-neutral-0 relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l-lg border border-solid border-base-3 bg-base-2 bg-clip-padding px-3 py-1.5 text-base font-normal outline-none transition duration-300 ease-in-out focus:border-primary focus:shadow-te-primary focus:outline-none"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="button-addon1" />
              <button
                className="transition-all duration-300 ease-in-out bg-base-1 hover:bg-base-3 rounded-r-lg text-white px-3"
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
        <div className="flex justify-between align-center items-center">
          <p className="text-white">Currently showing {data?.length} guides</p>

          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn btn-ghost text-white gap-x-2">
              <FunnelIcon className="h-6" />
              <p>Filter Result</p>
            </label>
            <ul tabIndex={0} className="dropdown-content menu !bg-base-2 border border-base-3 shadow-xl p-2 shadow bg-base-100 rounded-box w-60">
            <li onClick={ ()=> setTagId("") }><a className="text-base-5 text-base">None</a></li>
              {tags?.data?.map(tag => 

                <li key={tag.id} onClick={ ()=> setTagId(tag.id) }><a className="text-base-5 text-base">{ tag.name }</a></li>

              )}
            </ul>
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
