import { Bars3Icon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"
import React from "react"
import { HyperLogoAdmin } from "./HyperLogoAdmin"
import { SidebarMenuAdmin } from "./SidebarMenuAdmin"
import { EllipsisVerticalIcon, UserCircleIcon } from "@heroicons/react/24/solid"

export interface NavWrapperProps {
    children: React.ReactNode
    className?: string
}

const SidebarContent: React.FC = () => {
    const router = useRouter()
    function signOut(){
        localStorage.setItem('token', 'null')
        router.push('/admin')
    }
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu px-6 py-6 w-80 bg-base-1 text-base-content space-y-8">
                <HyperLogoAdmin />
                <div className="bg-base-2 w-full rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center space-x-2 text-xl">
                        <div className="avatar">
                            <div className="w-12 text-white">
                                <UserCircleIcon />
                            </div>
                        </div>
                        <h1 className="text-white font-bold">
                            Admin#1
                        </h1>
                        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost text-white">
                                <EllipsisVerticalIcon className="h-6" />
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu !bg-base-2 border border-base-3 shadow-xl p-2 shadow bg-base-100 rounded-box w-60">
                                <li className="text-error-main">
                                    <button onClick={() => signOut()}>Sign Out</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <SidebarMenuAdmin />
            </ul>
        </div>
    )
}

const NavWrapperAdmin: React.FC<NavWrapperProps> = ({ children, className }) => {
    const router = useRouter()


    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-base-1">
                <div className="block lg:hidden bg-base-1 w-full flex items-center h-16 px-4 space-x-4">
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
                router.pathname.startsWith("/admin/") && (
                    <SidebarContent />
                )
            }
        </div>
    )
}

export default NavWrapperAdmin