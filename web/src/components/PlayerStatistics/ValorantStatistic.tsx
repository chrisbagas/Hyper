import React from "react"
import { CardLineChart } from "../shared/Charts/CardLineChart";
import { ValorantMatchHistory } from "./ValorantMatchHistory";

export interface GameCardProps {
    status:number
    accountData?:any
    mmrData?:any
    competitiveHistory?:Array<any>
}

// For game type, please call Valorant game instead of hardcode
export const ValorantStatistic: React.FC<GameCardProps> = ({ status, accountData, mmrData, competitiveHistory }) => (
    <div className="flex flex-col">

        <div className="card bg-base-2 shadow-xl m-4">
            <div className="card-body gap-4 lg:gap-2">
                <div className="flex flex-row gap-4">
                    <figure>
                        <img className="bg-white rounded-md w-16 h-16" src="https://seeklogo.com/images/V/valorant-logo-FAB2CA0E55-seeklogo.com.png" />
                    </figure>
                    <div className="flex flex-col gap-2">
                        <h2 className="card-title text-neutral-0 font-bold">Valorant</h2>
                        <div className="badge badge-lg border-none text-neutral-0 font-normal bg-accent-6 text-sm">Competitive Game</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="card bg-base-2 shadow-xl m-4 flex flex-col lg:flex-row p-4 gap-y-4 lg:gap-x-4">
            <div className="basis-1/4 flex flex-col gap-y-4">

                <div className="flex flex-col gap-y-3 p-4 bg-base-3 rounded-lg">
                    <h3 className="text-sm font-bold text-base-5">Player Profile</h3>
                    <div className="badge badge-lg border-none text-neutral-0 font-normal bg-accent-0 text-sm uppercase">{ accountData.tag }</div>
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-xl font-bold text-neutral-0">{ accountData.name }</h2>
                        <div className="flex flex-row gap-x-1">
                            <h2 className="text-sm text-base-5">Account Level:</h2>
                            <p className="text-sm font-bold text-base-5">{ accountData.account_level }</p>
                        </div>
                        <div className="flex flex-row gap-x-1">
                            <h2 className="text-sm text-base-5">Region:</h2>
                            <p className="text-sm font-bold text-base-5 uppercase">{ accountData.region }</p>
                        </div>
                    </div>    
                </div>

                <div className="flex flex-col gap-y-3 p-4 bg-base-3 rounded-lg">
                    <h3 className="text-sm font-bold text-base-5">Rank History</h3>

                    <div className="flex flex-col gap-y-2 p-3 bg-base-4 rounded-lg">
                        <p className="text-sm text-neutral-0">Current Rating</p>
                        <div className="flex flex-row gap-x-2 items-center">
                            <img className="bg-white rounded-md w-12 h-12" src={ mmrData.current_rank_image } />
                            <div className="flex flex-col">
                                <h2 className="text-xl font-bold text-neutral-0">{ mmrData.current_rank }</h2>
                                <p className="text-sm text-base-5">ELO: { mmrData.elo }</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2 p-3 rounded-lg">
                        <p className="text-sm text-neutral-0">Peak Rating</p>
                        <div className="flex flex-row gap-x-2 items-center">
                            <img className="bg-white rounded-md w-8 h-8" src={ mmrData.highest_rank_image } />
                            <h2 className="text-lg font-bold text-neutral-0">{ mmrData.highest_rank }</h2>
                        </div>
                    </div>
                </div>

            </div>
            <div className="basis-3/4 flex flex-col gap-y-4">
                <h1 className="text-2xl font-bold text-neutral-0">Competitive History</h1>
                <div className="flex flex-col gap-y-3 p-4 bg-base-3 rounded-lg">
                    <h3 className="text-sm font-bold text-base-5">Match History</h3>

                    {competitiveHistory?.map(match => 
                    
                        <ValorantMatchHistory key={match.index} match={ match }> </ValorantMatchHistory>
                    
                    )}

                </div>
            </div>
        </div>

        <div>{status}</div>
        <div>{accountData.region}</div>

        <CardLineChart dataset="null"> </CardLineChart>

        
    </div>
)
