import React from "react"
import Logo from "./Logo"

export interface NavWrapperProps {
  children: React.ReactNode
  className?: string
}

const Navbar: React.FC = () => {
  return (
    <div className="navbar fixed bg-[#242424]">
      <div className="flex-none">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div>
      <div className="flex-1">
        <Logo href="/" />
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        </button>
      </div>
    </div>
  )
}

const SidebarContent: React.FC = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-[#242424] text-base-content">

      </ul>
    </div>
  )
}

const NavWrapper: React.FC<NavWrapperProps> = ({ children, className }) => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-[#121212]">
        <Navbar />
        <div className={className}>
          {children}
        </div>
      </div>
      <SidebarContent />
    </div>
  )
}

export default NavWrapper
