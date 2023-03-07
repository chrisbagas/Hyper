import React from "react"
import { HomeIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { Divider } from "./Divider"
import { useRouter } from "next/router"

export interface SidebarMenuButtonProps {
  children?: React.ReactNode
  path: string
}

const SidebarMenuButton: React.FC<SidebarMenuButtonProps> = ({ children, path }) => {
  const router = useRouter()
  return (
    <Link href={path}>
      <button
        className={
          [
            `btn w-full gap-4 px-6 text-left justify-start space-x-4`,
            router.pathname == path ? "bg-base-3" : `bg-transparent border-none !outline-none`
          ].join(" ")
        }
      >
        {children}
      </button>
    </Link>
  )
}

export const SidebarMenu: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <SidebarMenuButton path="/">
        <HomeIcon className="h-6" />
        Home
      </SidebarMenuButton>
      <Divider />
      <SidebarMenuButton path="/games/valorant">
        <img className="bg-white rounded-md w-6 h-6" src="/valorant.png" />
        VALORANT
      </SidebarMenuButton>
      <SidebarMenuButton path="/games/csgo">
        <img className="bg-white rounded-md w-6 h-6" src="/csgo.webp" />
        CSGO
      </SidebarMenuButton>
    </div>
  )
}
