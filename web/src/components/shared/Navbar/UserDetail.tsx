import React, { useEffect } from "react"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { signIn, signOut, useSession } from "next-auth/react"
import { EllipsisVerticalIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { api } from "../../../utils/api"
import { useRouter } from "next/router"

import { MediaLinks } from "../MediaLink/MediaLink"

const AuthorizedUserDetail: React.FC = () => {
  const { data, refetch } = api.users.getProfile.useQuery()
  const connectAccs = api.discord.getUserConnections.useQuery()
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    refetch()
  }, [session])

  return (
    <>
      <div className="bg-base-2 w-full rounded-lg p-4 space-y-4">
        <div className="flex justify-between items-center space-x-2 text-xl">
          <div className="avatar">
            <div className="w-12 text-white">
              <UserCircleIcon />
            </div>
          </div>
          <h1 className="text-white font-bold">
            {data?.name}
          </h1>
          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn btn-ghost text-white">
              <EllipsisVerticalIcon className="h-6" />
            </label>
            <ul tabIndex={0} className="dropdown-content menu !bg-base-2 border border-base-3 shadow-xl p-2 shadow bg-base-100 rounded-box w-60">
              <li >
                <button onClick={() => router.push("/profile")}>Profile</button>
              </li>
              <li className="text-error-main">
                <button onClick={() => signOut()}>Sign Out</button>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h1 className="text-base-4">Connected Accounts</h1>
          {connectAccs?.data?.length === 0 ? (
            <div className="text-base-5 mt-2">
              No  accounts connected
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              {connectAccs?.data && (
                <div className="flex flex-col gap-2 mt-2">
                  {connectAccs?.data?.length > 4 && (
                    <div className="max-h-28 overflow-y-auto">
                      <MediaLinks accs={connectAccs?.data} />
                    </div>
                  )}
                  {connectAccs?.data?.length <= 4 && (
                    <MediaLinks accs={connectAccs?.data} />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const UnauthenticatedUserDetail: React.FC = () => {
  return (
    <>
      <div className="text-warning-main flex space-x-2 items-center">
        <ExclamationCircleIcon className="w-8 h-8" />
        <span className="font-bold">
          Discord Disconnected
        </span>
      </div>
      <button className="btn bg-other-discord w-full font-bold gap-2" onClick={() => signIn()}>
        <div className="bg-neutral-0 rounded-full text-other-discord w-6 h-6 flex justify-center items-center">
          <svg className="fill-current w-4 h-4" width="13" height="10" viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.76 1.15175C9.98051 0.794153 9.13654 0.534605 8.25739 0.384644C8.23981 0.384644 8.22809 0.390411 8.21636 0.401947C8.11087 0.592282 7.98779 0.840295 7.90573 1.03063C6.96212 0.892204 6.0185 0.892204 5.09247 1.03063C5.01041 0.834527 4.88733 0.592282 4.77598 0.401947C4.77012 0.390411 4.75253 0.384644 4.73495 0.384644C3.8558 0.534605 3.01769 0.794153 2.23232 1.15175C2.22646 1.15175 2.22059 1.15752 2.21473 1.16329C0.62055 3.51076 0.180978 5.79478 0.397834 8.05573C0.397834 8.06727 0.403695 8.07881 0.415416 8.08457C1.47039 8.84591 2.48434 9.30733 3.48656 9.61302C3.50415 9.61879 3.52173 9.61302 3.52759 9.60149C3.76203 9.28426 3.97302 8.94973 4.15471 8.5979C4.16644 8.57483 4.15471 8.55176 4.13127 8.54599C3.79719 8.4191 3.4807 8.26914 3.17007 8.09611C3.14663 8.08457 3.14663 8.04997 3.16421 8.03266C3.22868 7.98652 3.29315 7.93461 3.35762 7.88847C3.36934 7.87693 3.38693 7.87693 3.39865 7.8827C5.41482 8.78824 7.58924 8.78824 9.58197 7.8827C9.59369 7.87693 9.61127 7.87693 9.623 7.88847C9.68747 7.94038 9.75194 7.98652 9.81641 8.03843C9.83985 8.05573 9.83985 8.09034 9.81055 8.10188C9.50578 8.28068 9.18342 8.42487 8.84935 8.55176C8.8259 8.55753 8.82004 8.58637 8.8259 8.60367C9.01346 8.9555 9.22445 9.29003 9.45303 9.60726C9.47061 9.61302 9.48819 9.61879 9.50578 9.61302C10.5139 9.30733 11.5278 8.84591 12.5828 8.08457C12.5945 8.07881 12.6004 8.06727 12.6004 8.05573C12.8582 5.44295 12.1725 3.17623 10.7835 1.16329C10.7776 1.15752 10.7717 1.15175 10.76 1.15175ZM4.45948 6.67725C3.8558 6.67725 3.35176 6.12931 3.35176 5.45448C3.35176 4.77966 3.84408 4.23172 4.45948 4.23172C5.08075 4.23172 5.57307 4.78543 5.56721 5.45448C5.56721 6.12931 5.07489 6.67725 4.45948 6.67725ZM8.54458 6.67725C7.9409 6.67725 7.43686 6.12931 7.43686 5.45448C7.43686 4.77966 7.92918 4.23172 8.54458 4.23172C9.16584 4.23172 9.65816 4.78543 9.6523 5.45448C9.6523 6.12931 9.16584 6.67725 8.54458 6.67725Z" fill="current" />
          </svg>
        </div>
        Connect Discord
      </button>
    </>
  )
}

export const UserDetail: React.FC = () => {
  const session = useSession()

  return (

    <div className="w-full space-y-4">
      {
        session.status !== "authenticated" ? (
          <UnauthenticatedUserDetail />
        ) : (
          <AuthorizedUserDetail />
        )
      }
    </div>
  )
}
