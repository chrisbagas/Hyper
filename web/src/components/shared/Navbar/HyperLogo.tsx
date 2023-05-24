import Link from "next/link"
import React from "react"

export const HyperLogo: React.FC = () => (
  <div className="flex justify-center h-20 w-full">
    <Link href="/" className="hover:scale-105 active:scale-95 transition-all">
      <img src="/hyper-logo-text.svg" className="h-20" />
    </Link>
  </div>
) 
