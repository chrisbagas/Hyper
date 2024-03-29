import React from "react"
import { useRouter } from "next/router"

export interface ValorantMatchHistoryProps {
    children:string
    match:any
    key:number
    username:any
    tag:any
}

export const ValorantMatchHistory: React.FC<ValorantMatchHistoryProps> = ({ match, username, tag }) => {
    const router = useRouter()
    return (
    <div key={match.index} onClick={() => router.push(`/match_details?match_id=${match.match_id}&id=${username},${tag}`)}>
        {
            match.victory ? (
                <div className="flex flex-col gap-y-2 lg:gap-y-0 lg:flex-row p-4 bg-base-1 lg:grid lg:grid-cols-4 rounded-md border border-success-main">

                    <div className="flex flex-row gap-x-4 items-center">
                        <img className="bg-white rounded-md w-12 h-12" src={ match.agent_image } />
                        <div className="flex flex-row items-center gap-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-1 stroke-success-main w-8 h-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                            </svg>
                            <h1 className="text-xl font-bold text-success-main">Victory</h1>
                        </div>
                        
                    </div>

                    <div className="flex flex-row gap-x-4 items-center">
                        <img className="bg-white rounded-md w-8 h-8" src={ match.rank_image } />
                        <div className="flex flex-col">
                            <h1 className="text-base font-bold text-neutral-0">{ match.rank }</h1>
                            <p className="text-xs text-base-4">ELO {match.elo_change }</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 col-span-2 gap-x-4 items-center">
                        <div className="flex flex-col">
                            <p className="text-xs text-base-4">Score</p>
                            <h1 className="text-base font-bold text-neutral-0">{ match.rounds_won }:{ match.rounds_lost }</h1>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs text-base-4">K/D/A</p>
                            <h1 className="text-base font-bold text-neutral-0">{ match.kills }/{ match.deaths }/{ match.assists }</h1>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs text-base-4">K/D</p>
                            <h1 className="text-base font-bold text-neutral-0">{ match.kd }</h1>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs text-base-4">Headshot</p>
                            <h1 className="text-base font-bold text-neutral-0">{ match.headshot_rate }%</h1>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-y-2 lg:gap-y-0 lg:flex-row p-4 bg-base-1 lg:grid lg:grid-cols-4 rounded-md border border-error-main">

                    <div className="flex flex-row gap-x-4 items-center">
                        <img className="bg-white rounded-md w-12 h-12" src={ match.agent_image } />
                        <div className="flex flex-row items-center gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-1 stroke-error-main w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                            <h1 className="text-xl font-bold text-error-main">Defeat</h1>
                        </div>
                        
                    </div>

                    <div className="flex flex-row gap-x-4 items-center">
                        <img className="bg-white rounded-md w-8 h-8" src={ match.rank_image } />
                        <div className="flex flex-col">
                            <h1 className="text-base font-bold text-neutral-0">{ match.rank }</h1>
                            <p className="text-xs text-base-4">ELO {match.elo_change }</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 col-span-2 gap-x-4 items-center">
                        <div className="flex flex-col">
                            <p className="text-xs text-base-4">Score</p>
                            <h1 className="text-base font-bold text-neutral-0">{ match.rounds_won }:{ match.rounds_lost }</h1>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs text-base-4">K/D/A</p>
                            <h1 className="text-base font-bold text-neutral-0">{ match.kills }/{ match.deaths }/{ match.assists }</h1>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs text-base-4">K/D</p>
                            <h1 className="text-base font-bold text-neutral-0">{ match.kd }</h1>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs text-base-4">Headshot</p>
                            <h1 className="text-base font-bold text-neutral-0">{ match.headshot_rate }%</h1>
                        </div>
                    </div>
                </div>
            )
        }
    </div>)
}