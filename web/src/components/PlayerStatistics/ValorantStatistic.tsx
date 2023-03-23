import React from "react"
import { CardLineChart } from "../shared/Charts/CardLineChart";

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

        <div className="card bg-base-2 shadow-xl m-4 flex flex-col md:flex-row p-4 gap-y-4 md:gap-x-4">
            <div className="basis-1/4 flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-4 p-4 bg-base-3 rounded-lg">
                    <h3 className="text-sm font-bold text-base-5">Player Profile</h3>
                </div>
                <div>
                    <h3 className="text-sm font-bold text-base-5">Rank History</h3>
                </div>
            </div>
            <div className="basis-3/4">
                a
            </div>
        </div>

        <div>{status}</div>
        <div>{accountData.region}</div>

        <CardLineChart dataset="null"> </CardLineChart>

        
    </div>
)
