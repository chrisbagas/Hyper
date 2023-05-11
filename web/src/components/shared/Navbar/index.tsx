import { Bars3Icon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"
import React from "react"
import { HyperLogo } from "./HyperLogo"
import { SidebarMenu } from "./SidebarMenu"
import { UserDetail } from "./UserDetail"

import { atom, useAtom } from "jotai"

export interface NavWrapperProps {
  children: React.ReactNode
  className?: string
}

export const scrollAtom = atom(0)

const SidebarContent: React.FC = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu px-6 py-6 w-80 bg-base-1 text-base-content space-y-8">
        <HyperLogo />
        <UserDetail />
        <SidebarMenu />
      </ul>
    </div>
  )
}

const NavWrapper: React.FC<NavWrapperProps> = ({ children, className }) => {
  const router = useRouter()

  const [scroll, setScroll] = useAtom(scrollAtom)

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-1" onScroll={(e) => setScroll(e.currentTarget.scrollTop)}>
        <div className={`${!router.pathname.startsWith("/landing") ? "block" : "hidden"} lg:hidden bg-base-1 w-full flex items-center h-16 px-4 space-x-4`}>
          <label htmlFor="my-drawer">
            <Bars3Icon className="h-8 text-neutral-4" />
          </label>
          <img src="/hyper-logo-text.svg" className="h-8" />
        </div>
        <div className={className}>
          {children}
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
