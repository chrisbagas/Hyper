import React from "react"
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { PartyMember, PartyMemberLevel, Game } from "@prisma/client";

export interface PartyDetailsData {
    userId: string,
    partyId: string,
    partyMembers: PartyMember[],
    title: string,
    game: Game,
    minimalRank: string | undefined,
    averageRank: string | undefined,
    averageKDR: number | undefined,
    averageWinrate: number | undefined,
    discordVoiceLink: string | undefined,
    discordVoiceID: string | undefined
}

const PartyDetails = (props: PartyDetailsData) => {
    const leavePartyMutation = api.party.leaveParty.useMutation()
    const deletePartyMutation = api.party.deleteParty.useMutation()
    const router = useRouter()
    let isLeader = false

    // check if the user is the leader of the party or not
    for (const partyMember of props.partyMembers) {
        if (partyMember.userId == props.userId && partyMember.level == PartyMemberLevel.leader) {
            isLeader = true
            break
        }
    }
    
    function leaveParty(e: any) {
        e.preventDefault()

    const leavePartyDTO = {
      userId: props.userId,
      partyId: props.partyId
    }

        leavePartyMutation.mutate(leavePartyDTO)

        // use refetch after refactor
        router.reload()
    }

    function deleteParty(e: any) {
        e.preventDefault()

        const deletePartyDTO = {
            userId: props.userId,
            partyId: props.partyId
        }
        
        deletePartyMutation.mutate(deletePartyDTO)

        // use refetch after refactor
        router.reload()
    }
    return (
        <>
            <div className="flex flex-col justify-start w-full h-full p-8 bg-gray-700 text-white">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold">Party Detail</h1>
                </div>
                <div>
                    <h2 className="my-4 text-xl">Party Name: {props.title}</h2>
                    <h2 className="my-4 text-xl">Game: {props.game.name}</h2>
                    <div className="grid grid-cols-2">
                        {props.minimalRank
                            ? <div className="flex flex-row">
                                <h3 className="text-white text-opacity-50">Minimal Rank:</h3> 
                                <h3 className="ml-5">{props.minimalRank}</h3>
                            </div>
                            : <></>
                        }
                        {props.averageKDR
                            ? <div className="flex flex-row">
                                <h3 className="text-white text-opacity-50">Average K/D:</h3>
                                <h3 className="ml-5">{props.averageKDR}</h3>
                                <h3 className="ml-2 italic text-white text-opacity-75">(last 60 days)</h3>
                            </div>
                            : <></>
                        }
                        {props.averageRank
                            ? <div className="flex flex-row">
                                <h3 className="text-white text-opacity-50">Average Rank:</h3>
                                <h3 className="ml-5">{props.averageRank}</h3>
                            </div>
                            : <></>
                        }
                        {props.averageWinrate
                            ? <div className="flex flex-row">
                                <h3 className="text-white text-opacity-50">Average WR:</h3>
                                <h3 className="ml-5">{props.averageWinrate}</h3>
                                <h3 className="ml-2 italic text-white text-opacity-75">(last 60 days)</h3>
                            </div>
                            : <></>
                        }
                    </div>
                </div>
                <div className="flex flex-row mt-8 mb-4">
                    <button className="btn bg-blue-500 hover:bg-blue-600 mr-4">Join Discord Voice</button>
                    {isLeader
                        ? <button onClick={deleteParty} className="btn bg-red-600 bg-opacity-25 border-red-500 hover:bg-opacity-100 hover:bg-red-600">Delete Party</button>
                        : <button onClick={leaveParty} className="btn bg-red-600 bg-opacity-25 border-red-500 hover:bg-opacity-100 hover:bg-red-600">Leave Party</button>
                    }
                </div>
                <div>
                    {props.discordVoiceID
                        ? <h3>
                            Discord Voice Channel ID: {props.discordVoiceID}
                        </h3>
                        : <></>
                    }
                </div>
            </div>
        </>
    )
}

export { PartyDetails };
