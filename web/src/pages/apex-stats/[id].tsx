import React from "react"

import { GameDashboardNav } from "../../components/shared/GameDashboard/GameDashboardNav";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";
import { useGlobalLoader } from "../../components/shared/Loader";

export default function PlayerStats() {
  const router = useRouter()
  const gameId = router.query.game
  const { data: game, isLoading: gameIsLoading } = api.games.getById.useQuery({ id: gameId as string })
  const session = useSession()

  const { setLoadingStates } = useGlobalLoader()
  React.useEffect(() => {
    setLoadingStates([gameIsLoading])
  }, [gameIsLoading])

  return (
    <>
      <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
      <div className="px-16 py-8">
        <div className="min-h-screen">
          <div className="flex space-x-12 px-8 items-center">
            <div className="flex items-center justify-center">
              <img
                src="https://avatars.akamai.steamstatic.com/c0ae6292cf0d3c9edd26aebd3a2859c7e305d713_full.jpg"
                className="w-48 h-48 rounded-lg bg-base-1"
              />
            </div>
            <div className="flex flex-col h-full">
              <h1 className="text-4xl font-bold text-white">
                Meta
              </h1>
              <div className="flex justify-center items-center space-x-2">
                <h2 className="text-lg font-medium">
                  Highest Rank:
                </h2>
                <img className="w-16 h-16" src="https://api.mozambiquehe.re/assets/ranks/platinum1.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
