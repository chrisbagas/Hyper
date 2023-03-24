import React from "react"
import Link from "next/link"

export interface GameCardProps {
    id: string
    logoUrl?: string
    name?: string
    communityPost?: number
    openParty?: number
}


export const GameCard: React.FC<GameCardProps> = ({ id, logoUrl, name, communityPost, openParty }) => (
    <div key={id} className="card bg-base-2 shadow-xl m-4">
        <div className="card-body gap-4 lg:gap-2">

            <div className="flex flex-row gap-4">
                <figure>
                    <img className="bg-white rounded-md w-16 h-16" src={logoUrl} />
                </figure>

                <div className="flex flex-col gap-2">
                    <h2 className="card-title text-neutral-0 font-bold">{name}</h2>
                    <div className="badge badge-lg border-none text-neutral-0 font-normal bg-accent-6 text-sm">Games</div>
                </div>
            </div>

            <div className="card-actions flex justify-between items-center">
                <div className="flex flex-col sm:flex-row gap-4">

                    <div className="flex flex-row items-center gap-2 md:py-[12px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-2 stroke-success-main w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                        </svg>
                        <p className="font-normal font-sm text-base-5">{openParty} Open Parties</p>
                    </div>

                    <div className="flex flex-row items-center gap-2 md:py-[12px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-2 stroke-success-main w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                        <p className="font-normal font-sm text-base-5">{communityPost} Community Posts</p>
                    </div>

                </div>
                <Link href={"/" + id  + "/home"}>
                    <button className="btn btn-ghost gap-2">
                        View More
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </Link>
            </div>

        </div>
    </div>
)
