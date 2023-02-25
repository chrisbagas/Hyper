import Link from "next/link"
import React from "react"

export interface LogoProps {
  className?: string
  href?: string
}

const logoWrapperClassName = "normal-case text-xl text-white"
const logoButtonWrapperClassName = "btn btn-ghost normal-case text-xl text-white"

const Logo: React.FC<LogoProps> = ({ className = "", href }) => (
  href ? (
    <Link href={href} className={`${logoButtonWrapperClassName} ${className}`}>
      <span>hyper</span>
      <span className="text-red-500">.gg</span>
    </Link>
  ) : (
    <a className={`${logoWrapperClassName} ${className}`}>
      <span>hyper</span>
      <span className="text-red-500">.gg</span>
    </a>
  )
)

export default Logo

