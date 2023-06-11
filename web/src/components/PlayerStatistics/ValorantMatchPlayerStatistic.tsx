import React from "react"

export interface ValorantMatchPlayerStatisticsProps {
    key:number
    player:any
    victory:boolean
}

export const ValorantMatchPlayerStatistics: React.FC<ValorantMatchPlayerStatisticsProps> = ({ player, victory }) => (

    <div key={ player.index }>
        <div className={`flex flex-col gap-y-2 md:flex-row md:justify-between md:gap-y-0 p-4 bg-base-1 rounded-md border ${ victory ? "border-success-main" : "border-error-main"}`}>

            <div className="flex flex-row gap-x-4 items-center">
                <img className="bg-white rounded-md w-12 h-12" src={ player.agent_image } />
                <div className="flex flex-col gap-y-1">
                    <div className="flex flex-row gap-x-2 items-center">
                        <img className="bg-white rounded-md w-4 h-4" src={ player.rank_image } />
                        <h3 className="text-base font-bold text-neutral-0">{ player.name }</h3>
                    </div>
                    <p className="text-sm text-base-5">#{ player.tag }</p>
                </div>
                
            </div>

            <div className="flex flex-row  gap-x-6 md:gap-x-4 items-center">
                <div className="flex flex-col">
                    <p className="text-xs text-base-4">K/D/A</p>
                    <h1 className="text-base font-bold text-neutral-0">{ player.kills }/{ player.deaths }/{ player.assists }</h1>
                </div>
                <div className="flex flex-col">
                    <p className="text-xs text-base-4">K/D</p>
                    <h1 className="text-base font-bold text-neutral-0">{ player.kd }</h1>
                </div>
                <div className="flex flex-col">
                    <p className="text-xs text-base-4">HSR</p>
                    <h1 className="text-base font-bold text-neutral-0">{ player.headshot_rate }%</h1>
                </div>
            </div>
            
        </div>
    </div>

)

