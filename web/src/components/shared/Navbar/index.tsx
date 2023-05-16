import { Bars3Icon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"
import React from "react"
import { HyperLogo } from "./HyperLogo"
import { SidebarMenu } from "./SidebarMenu"
import { UserDetail } from "./UserDetail"

import { atom, useAtom } from "jotai"
import { useSession } from "next-auth/react"
import { api } from "../../../utils/api"
import Link from "next/link"
import { Tooltip } from "@mui/material"

export interface NavWrapperProps {
  children: React.ReactNode
  className?: string
}

export const scrollAtom = atom(0)

const CollapsedSidebarContent: React.FC = () => {
  const games = api.games.getAll.useQuery()
  const router = useRouter()

  return (
    (!router.pathname.startsWith("/admin") && router.pathname !== "/landing") ?
      <ul className={`menu fixed h-full z-10 px-6 py-6 transition-all w-24 bg-base-1 text-base-content space-y-6 flex flex-col items-center justify-between`}>
        <div className="space-y-6">
          <label htmlFor="my-drawer" className="cursor-pointer">
            <Bars3Icon className="h-8 text-neutral-4" />
          </label>

          <div>
            <Link href="/">
              <HomeIcon className="h-8" />
            </Link>
          </div>

          <div className="h-[1px] w-full bg-base-3" />

          <div>
            {games?.data?.map(game =>
              <Tooltip title={game.name} placement="right">
                <Link href={"/" + game.id + "/home"}>
                  <img className="bg-white rounded-md w-8 h-8 hover:scale-105 transition-all" src={game.logoUrl} />
                </Link>
              </Tooltip>
            )}
          </div>
        </div>
        <div>

          <div className="avatar">
            <div className="w-12 text-white">
              <UserCircleIcon />
            </div>
          </div>
        </div>
      </ul> : <></>
  )
}

const SidebarContent: React.FC = () => {
  return (
    <div className="drawer-side group">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu px-6 py-6 transition-all w-80 bg-base-1 text-base-content space-y-8">
        <HyperLogo />
        <UserDetail />
        <SidebarMenu />
      </ul>
    </div>
  )
}

const NavWrapper: React.FC<NavWrapperProps> = ({ children, className }) => {
  const router = useRouter()
  const session = useSession()

  const [scroll, setScroll] = useAtom(scrollAtom)

  React.useEffect(() => {
    if (!router.pathname.startsWith("/admin") && router.pathname !== "/landing" && session.status === "unauthenticated") {
      router.push("/landing")
    }
  }, [router.pathname, session.status])

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-1" onScroll={(e) => setScroll(e.currentTarget.scrollTop)}>
        <div className={`${!router.pathname.startsWith("/landing") ? "block" : "hidden"} lg:hidden bg-base-1 w-full flex items-center h-16 px-4 space-x-4`}>
          <label htmlFor="my-drawer">
            <Bars3Icon className="h-8 text-neutral-4" />
          </label>
          <img src="/hyper-logo-text.svg" className="h-8" />
        </div>
        <div className="flex">
          <CollapsedSidebarContent />
          <div className={`${className} ${!router.pathname.startsWith("/admin") && router.pathname !== "/landing" && "pl-20"}`}>
            {children}
          </div>
        </div>
      </div>
      {
        !router.pathname.startsWith("/admin") && !router.pathname.startsWith("/landing") && (
          <SidebarContent />
        )
      }
    </div>
  )
}

export default NavWrapper
