import React from "react"
import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"

export interface GuideTopButtonGroupProps {
  children: React.ReactNode
  className?: string
  returnUrl: string
}

export const GuideTopButtonGroup: React.FC<GuideTopButtonGroupProps> = ({ children, className, returnUrl }) => {
  return (
    <div className={`flex justify-between pt-8 ${className}`}>
      <Link href={returnUrl}> <button className="flex btn btn-ghost normal-case gap-2 text-neutral-0"><ArrowLeftIcon className="w-4"/> Go Back</button> </Link>
      {children}
    </div>
  )
}
