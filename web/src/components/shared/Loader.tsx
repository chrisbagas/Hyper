import React from "react";
import { atom, useAtom } from "jotai";

import { LinearProgress } from "@mui/material"
import { useRouter } from "next/router"

export const loadingAtom = atom(false)

export const useGlobalLoader = () => {
  const [loading, setLoading] = useAtom(loadingAtom)
  const [loadingStates, setLoadingStates] = React.useState<boolean[]>([])

  React.useEffect(() => {
    setLoading(
      loadingStates.some(arg => arg === true)
    )
  }, [loadingStates])

  return {
    loading,
    setLoading,
    setLoadingStates,
  }
}

export const Loader: React.FC = () => {
  const router = useRouter();
  const { loading, setLoading } = useGlobalLoader();

  React.useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true))
    router.events.on("routeChangeComplete", () => setLoading(false))
    router.events.on("routeChangeError", () => setLoading(false))
  })

  return (
    <div className="absolute top-0 w-screen">
      <LinearProgress className={`${loading ? "opacity-100" : "opacity-0"} transition-all text-base-5 z-20`} color="inherit" />
    </div>
  )
}
