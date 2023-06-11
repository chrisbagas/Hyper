import React from "react";
import { type NextPage } from "next";
import { GuideCard } from "../../../components/Guide/GuideCard";
import Link from "next/link";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GameDashboardNav } from "../../../components/shared/GameDashboard/GameDashboardNav";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useGlobalLoader } from "../../../components/shared/Loader";
import { ContentType } from "@prisma/client";

const Guides: NextPage = () => {
  const router = useRouter()
  const id = router.query.game
  const session = useSession()
  const { data: game, isLoading: gameIsLoading } = api.games.getById.useQuery({ id: id as string })
  const { data, isLoading: guideIsLoading } = api.guides.getAllbyUser.useQuery({ gameId: id as string, userId: session.data?.user.id as string })

  const { setLoadingStates } = useGlobalLoader()
  React.useEffect(() => {
    setLoadingStates([gameIsLoading, guideIsLoading])
  }, [gameIsLoading, guideIsLoading])

  return (
    <>
      <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
      <div className="px-16 py-8">
        <div className="flex justify-between items-center content-center my-6">
          <h1 className="text-2xl font-bold text-white">Your Posts</h1>
          <Link href={`/${id}/your-guides/create`}>
            <button className="btn bg-primary-main text-white">
              <span className="hidden lg:block">Create New Post &nbsp;</span>
              <PencilSquareIcon className="w-5 h-5" />
            </button>
          </Link>
        </div>
        <div className="grid xl:grid-cols-3 grid-flow-row gap-8 content-center justify-center items-center my-6">
          {data?.map((guide) => {
            return (
              <GuideCard key={guide.id} title={guide.title} username={guide.author.name ?? ''} createdAt={guide.createdAt} content={guide.content ?? ''} status={guide.status} gameId={id as string} postId={guide.id} guidesLoc="your-guides" headerUrl={guide.header?.url as string} headerType={guide.header?.type as ContentType}></GuideCard>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default Guides;
