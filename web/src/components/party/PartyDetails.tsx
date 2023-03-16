import React from "react"

export interface PartyDetailsData {
    title: string,
    minimalRank: string,
    averageRank: string,
    averageKDR: number,
    averageWinrate: number,
    discordVoiceLink: string | undefined,
    discordVoiceID: string | undefined
}

function joinDiscordVoice(e: any) {
    e.preventDefault()
}

function leaveParty(e: any) {
    e.preventDefault()
}

const PartyDetails = (props: PartyDetailsData) => {
    return (
        <>
            <div className="flex flex-col justify-start w-full max-w-4xl h-full p-8 bg-gray-700 text-white">
            <div className="mb-4">
                <h1 className="text-4xl font-bold">Party Detail</h1>
            </div>
            <div>
                <h2 className="my-4 text-xl">Party Name: {props.title}</h2>
                <div className="grid grid-cols-2">
                <div className="flex flex-row">
                    <h3 className="text-white text-opacity-50">Minimal Rank:</h3> 
                    <h3 className="ml-5">{props.minimalRank}</h3>
                </div>
                <div className="flex flex-row">
                    <h3 className="text-white text-opacity-50">Average K/D:</h3>
                    <h3 className="ml-5">{props.averageKDR}</h3>
                    <h3 className="ml-2 italic text-white text-opacity-75">(last 60 days)</h3>
                </div>
                <div className="flex flex-row">
                    <h3 className="text-white text-opacity-50">Average Rank:</h3>
                    <h3 className="ml-5">{props.averageRank}</h3>
                </div>
                <div className="flex flex-row">
                    <h3 className="text-white text-opacity-50">Average WR:</h3>
                    <h3 className="ml-5">{props.averageWinrate}%</h3>
                    <h3 className="ml-2 italic text-white text-opacity-75">(last 60 days)</h3>
                </div>
                </div>
            </div>
            <div className="flex flex-row mt-8 mb-4">
                <button onClick={joinDiscordVoice} className="btn bg-blue-500 hover:bg-blue-600 mr-4">Join Discord Voice</button>
                <button onClick={leaveParty} className="btn bg-red-600 bg-opacity-25 border-red-500 hover:bg-opacity-100 hover:bg-red-600">Leave</button>
            </div>
            <div>
                <h3>
                Discord Voice Channel ID: 
                {props.discordVoiceID}
                </h3>
            </div>
            </div>
        </>
    )
}

export {PartyDetails};