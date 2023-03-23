import React from "react"

export interface GameCardProps {
    status:number
    accountData?:any
    mmrData?:any
    competitiveHistory?:Array<any>
}


export const ValorantStatistic: React.FC<GameCardProps> = ({ status, accountData, mmrData, competitiveHistory }) => (
    <div className="card bg-base-2 shadow-xl m-4">
        <div>{status}</div>
        <div>{accountData.region}</div>

        
    </div>
)
