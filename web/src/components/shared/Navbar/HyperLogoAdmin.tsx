import Link from "next/link"
import React from "react"

export const HyperLogoAdmin: React.FC = () => (
  <div className="flex justify-center w-full">
    <Link href="/admin/dashboard" className="hover:scale-105 active:scale-95 transition-all">
      <div className="flex justify-between items-center content-center">
        <img src="/Official-Logo-Base.svg" className="h-8 px-2" />
        <span className="text-base-4 text-lg">Hyper Admin Dashboard</span>
      </div>
    </Link>
  </div>
) 
