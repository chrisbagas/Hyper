import React from "react"
import { PartyVisibility, PartyType, PartyMember } from "@prisma/client"
import { api } from "../../utils/api";

export interface PartyCardData {
    userId: string,
    partyId: string,
    gameId: string,
    title: string,
    minimalRank: string | undefined,
    visibility: PartyVisibility,
    type: PartyType,
    partyMembers: PartyMember[],
    isFull: boolean
}

const PartyCard = (props: PartyCardData) => {
    const partyMutation = api.party.joinParty.useMutation()

    function joinParty(e: any) {
        e.preventDefault()

        const joinPartyDTO = {
            userId: props.userId,
            partyId: props.partyId,
            gameId: props.gameId
        }

        partyMutation.mutate(joinPartyDTO)
    }

    const memberAvatars = props.partyMembers.map((partyMember) =>
        <div className="avatar">
            <div className="w-12 rounded-full">
                <img src="https://media.hitekno.com/thumbs/2022/09/20/49670-meme-amogus/730x480-img-49670-meme-amogus.jpg" />
            </div>
        </div>
    )
    let i = props.partyMembers.length
    while (i < 5) {
        memberAvatars.push(
            <div className="avatar">
                <div className="w-12 rounded-full bg-gray-200">
                </div>
            </div>
        )
        i++;
    }

    return (
        <>
            <div className="flex flex-col justify-start w-full max-w-4xl h-full p-8 bg-gray-700 text-white">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                    <div className="bg-red-400 mx-2 py-1 px-2 rounded-lg text-sm">
                        {props.visibility}
                    </div>
                    <div className="bg-green-400 mx-2 py-1 px-2 rounded-lg text-sm">
                        {props.type}
                    </div>
                    </div>
                    <div>
                    <h3 className="opacity-50 text-xl"></h3>
                    </div>
                </div>
                <div>
                    <h1 className="text-4xl font-bold my-4">
                        {props.title}
                    </h1>
                </div>
                <div className="flex flex-row">
                    {props.minimalRank 
                        ? <p className="text-white text-opacity-50 mr-2">
                            Minimal Rank: {props.minimalRank} 
                        </p> 
                        : <></>
                    }
                </div>
                <div className="flex flex-row align-center justify-between mt-10">
                    <div className="flex flex-row">
                    <div className="bg-gray-700 p-2 rounded-lg font-bold">
                        {props.partyMembers.length}/5
                    </div>
                    <div className="avatar-group -space-x-6 mx-8">

                        {memberAvatars}
                        
                    </div>
                    </div>
                    <div>
                        <button className="btn bg-blue-500 hover:bg-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>  
                        </button>
                        {props.isFull
                            ? <button className="btn bg-gray-500">Join Party</button>
                            : <button onClick={joinParty} className="btn bg-green-500 hover:bg-green-600">Join Party</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export {PartyCard};