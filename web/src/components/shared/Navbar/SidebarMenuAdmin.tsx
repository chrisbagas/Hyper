import React from "react"
import { HomeIcon } from "@heroicons/react/24/solid"
import { NewspaperIcon } from "@heroicons/react/24/outline";
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
      <label
        className={
          [
            `btn w-full gap-4 px-6 text-left justify-start space-x-4`,
            router.pathname == path ? "bg-base-3" : `bg-transparent border-none !outline-none`
          ].join(" ")
        }
        htmlFor="my-drawer"
      >
        {children}
      </label>
    </Link>
  )
}

export const SidebarMenuAdmin: React.FC = () => {

  return (
    <div className="flex flex-col space-y-2">
      <SidebarMenuButton path="/admin/dashboard">
        <HomeIcon className="h-6" />
        Home
      </SidebarMenuButton>
      <Divider />
      <SidebarMenuButton path="/admin/dashboard" >
        <NewspaperIcon className="rounded-md w-6 h-6 text-neutral-0" />
        <span className="text-neutral-0">Community Post</span>
      </SidebarMenuButton>
    </div>
  )
}
