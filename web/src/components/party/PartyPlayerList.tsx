import React from "react"
import { PartyPlayerData, PartyPlayer } from "./PartyPlayer"

export interface PartyPlayerListData {
    partyPlayers: PartyPlayerData[]
}

const PartyPlayerList = (props: PartyPlayerListData) => {
    const partyPlayers = props.partyPlayers.map((partyPlayer) =>
        <PartyPlayer key={partyPlayer.userId} {...partyPlayer} />
    )
    let i = props.partyPlayers.length
    while (i < 5) {
        partyPlayers.push(
            <div className="flex flex-row max-w-full bg-gray-500 p-4 my-4 rounded-xl align-bottom">
                <div className="w-12 h-12 bg-gray-200 rounded-full object-cover">
                </div>
                <h2 className="font-semibold text-lg ml-6">
                    Empty Slot
                </h2>
            </div>
        )
        i++;
    }

    return (
        <>
            <div className="flex flex-col justify-start w-full max-w-4xl h-full p-8 bg-gray-700 text-white">
                <div className="flex flex-row">
                    <div className="text-4xl font-bold">
                        Player List
                    </div>
                    <div className="bg-gray-500 p-2 ml-10 rounded-lg font-bold">
                    {props.partyPlayers.length}/5
                    </div>
                </div>

                {partyPlayers}

            </div>
        </>
    )
}

export {PartyPlayerList};