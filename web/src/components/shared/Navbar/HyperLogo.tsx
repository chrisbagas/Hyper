import Link from "next/link"
import React from "react"

export const HyperLogo: React.FC = () => (
  <div className="flex justify-center w-full">
    <Link href="/" className="hover:scale-[1.10] active:scale-95 transition-all">
      <img src="/hyper-logo.svg" className="w-12" />
    </Link>
  </div>
) 
