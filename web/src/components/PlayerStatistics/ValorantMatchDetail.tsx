import { FlagIcon, TrophyIcon } from "@heroicons/react/24/solid"
import React from "react"
import { ValorantMatchPlayerStatistics } from "./ValorantMatchPlayerStatistic";

export interface ValorantMatchDetailProps {
    status:number
    map_name?:string
    friendly_team_score?:number
    enemy_team_score?:number
    friendly_team_members?:Array<any>
    enemy_team_members?:Array<any>
}

export const ValorantMatchDetail: React.FC<ValorantMatchDetailProps> = ({ status, map_name, friendly_team_score, enemy_team_score, friendly_team_members, enemy_team_members }) => (
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

        <div className="card bg-base-2 shadow-xl m-4 p-8 flex flex-col p-4 gap-y-4">
            <div className="flex flex-col gap-y-2">
                <p className="text-sm font-bold text-base-5">Competitive Match Details</p>
                <h1 className="text-3xl font-bold text-neutral-0">{ map_name }</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-4">
                
                <div className="flex flex-col gap-y-4 basis-1/2">
                    <div className={`flex flex-row justify-between items-center py-4 px-6 rounded-md ${friendly_team_score && enemy_team_score && friendly_team_score > enemy_team_score ? "bg-success-main" : "bg-error-main"}`}>
                        <div className="flex flex-row items-center gap-x-2">
                            {
                                friendly_team_score && enemy_team_score && friendly_team_score > enemy_team_score ? (
                                    <TrophyIcon className="w-8 h-8 text-neutral-0" />
                                ) : (
                                    <FlagIcon className="w-8 h-8 text-neutral-0" />
                                )
                            }
                            
                            <h2 className="text-xl font-bold text-neutral-0">Team A</h2>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <p className="text-sm text-neutral-0">Rounds Won:</p>
                            <h2 className="text-xl font-bold text-neutral-0">{ friendly_team_score }</h2>
                        </div>
                    </div>

                    {friendly_team_members?.map(player => 
                    
                        friendly_team_score && enemy_team_score &&
                        <ValorantMatchPlayerStatistics key={ player.index } player={ player } victory={ friendly_team_score > enemy_team_score } />
                
                    )}

                </div>

                <div className="flex flex-col gap-y-4 basis-1/2">
                    <div className={`flex flex-row justify-between items-center py-4 px-6 rounded-md ${friendly_team_score && enemy_team_score && friendly_team_score < enemy_team_score ? "bg-success-main" : "bg-error-main"}`}>
                        <div className="flex flex-row items-center gap-x-2">
                            {
                                friendly_team_score && enemy_team_score && friendly_team_score < enemy_team_score ? (
                                    <TrophyIcon className="w-8 h-8 text-neutral-0" />
                                ) : (
                                    <FlagIcon className="w-8 h-8 text-neutral-0" />
                                )
                            }
                            
                            <h2 className="text-xl font-bold text-neutral-0">Team B</h2>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <p className="text-sm text-neutral-0">Rounds Won:</p>
                            <h2 className="text-xl font-bold text-neutral-0">{ enemy_team_score }</h2>
                        </div>
                    </div>

                    {enemy_team_members?.map(player => 
                    
                        friendly_team_score && enemy_team_score &&
                        <ValorantMatchPlayerStatistics key={ player.index } player={ player } victory={ friendly_team_score < enemy_team_score } />
            
                    )}

                </div>

            </div>
        </div>


    </div>
)