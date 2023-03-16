import { PartyType, PartyVisibility } from "@prisma/client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

export interface PartyCreateData {
    gameId: string,
    userId: string
}

function createParty(e: any) {
    e.preventDefault()
}

const PartyCreate = (props: PartyCreateData) => {
    const router = useRouter()
    const partyMutation = api.party.createParty.useMutation()

    const [party, setParty] = useState({
        title: "",
        type: "",
        visibility: "",
        minimumRank: "",
    })

    const handleChange = (event: any) => {
        const value = event.target.value
        setParty({
            ...party,
            [event.target.id]: value
        })
    }

    const saveParty = async (e: any) => {
        e.preventDefault()
        const partyCreateObject = {
            gameId: props.gameId,
            partyTitle: party.title,
            minimumRank: party.minimumRank,
            partyType: party.type as PartyType,
            partyVisibility: party.visibility as PartyVisibility
        }
        partyMutation.mutate(partyCreateObject)
    }

    return (
        <>
            <div className="flex flex-col justify-start w-full max-w-7xl h-full p-8 bg-gray-700 text-white">
                <div>
                    <h2 className="text-4xl font-bold mt-4 mb-12">
                        Create New Party
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <h3 className="font-semibold text-xl mb-2">Party Name</h3>
                        {/* todo: textbox */}
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl mb-2">Party Type</h3>
                        {/* todo: text box */}
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl mb-2">Party Visibility</h3>
                        {/* todo: dropdown */}
                        <p>Set whether anyone can join your party or not</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl mb-2">Minimum Rank</h3>
                        {/* todo: dropdown */}
                        <p>Set the minimum rank needed to join your party</p>
                    </div>
                </div>
                <div>
                    <button onClick={createParty} className="btn bg-blue-500 hover:bg-blue-600">Create Party</button>
                </div>
            </div>
        </>
    )
}

export {PartyCreate};