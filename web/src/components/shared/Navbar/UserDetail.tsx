import React from "react"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { useSession } from "next-auth/react"

export const UserDetail: React.FC = () => {
  const session = useSession()
  return (
    <div className="w-full space-y-4">
      <div className="text-warning-main flex space-x-2 items-center">
        <ExclamationCircleIcon className="w-8 h-8" />
        <span className="font-bold">
          Discord Disconnected
        </span>
      </div>
      <button className="btn bg-other-discord w-full font-bold">
        Connect Discord
      </button>
    </div>
  )
}
