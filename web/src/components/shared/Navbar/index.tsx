import React from "react"


import { HyperLogo } from "./HyperLogo"
import { SidebarMenu } from "./SidebarMenu"
import { UserDetail } from "./UserDetail"

export interface NavWrapperProps {
  children: React.ReactNode
  className?: string
}

const SidebarContent: React.FC = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu px-4 py-6 w-80 bg-base-1 text-base-content space-y-8">
        <HyperLogo />
        <UserDetail />
        <SidebarMenu />
      </ul>
    </div>
  )
}

const NavWrapper: React.FC<NavWrapperProps> = ({ children, className }) => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-1">
        <div className={className}>
          {children}
        </div>
      </div>
      <SidebarContent />
    </div>
  )
}


export default NavWrapper
