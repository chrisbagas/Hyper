import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"

export const ProfileSkeleton = () => (
  <>
    <div className="flex justify-between mx-16 pt-8">
      <Link href="/"> <button className="flex btn btn-ghost normal-case gap-2 text-white"><ArrowLeftIcon className="w-4" /> Go Back</button> </Link>
    </div>
    <div className="space-y-4 mx-16 animate-pulse my-4">
      <div className="flex space-x-8">
        <div className="flex justify-center items-start">
          <div className="bg-base-1 rounded-full w-24 h-24" />
        </div>
        <div className="bg-base-1 rounded-xl w-full h-40" />
      </div>
      <div className="bg-base-1 rounded-xl w-full h-80" />
      <div className="bg-base-1 rounded-xl w-full h-40" />
    </div>
  </>
)
