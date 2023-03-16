import React from "react"
import { PartyMemberLevel } from "@prisma/client"

export interface PartyPlayerData {
    username: string,
    matches: number,
    kdr: number,
    winrate: number,
    profilePictureURL: string | undefined,
    level: PartyMemberLevel
}

const PartyPlayer = (props: PartyPlayerData) => {
    return (
        <>
            <div className="flex flex-row max-w-full h-full justify-between bg-gray-500 p-4 my-4 rounded-xl align-bottom">
                <div className="flex flex-row">
                <img className="w-12 h-12 rounded-full object-cover"
                    src={props.profilePictureURL}
                />
                <div className="flex flex-col ml-6">
                    <h2 className="font-semibold text-lg mb-1">{props.username}</h2>
                    <h3>Matches: {props.matches} | K/D: {props.kdr} | WR: {props.winrate}%</h3>
                </div>
                </div>
                <button className="btn btn-circle bg-red-600 border-red-700 hover:bg-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </>
    )
}

export {PartyPlayer};