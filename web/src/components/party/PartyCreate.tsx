import { PartyType, PartyVisibility } from "@prisma/client";
import React, {useState} from "react";
import { api } from "../../utils/api";

export interface PartyCreateData {
    gameId: string,
    userId: string
}

const PartyCreate = (props: PartyCreateData) => {
    const [name, setName] = useState("")
    const [type, setType] = useState(PartyType.Casual)
    const [visibility, setVisibility] = useState(PartyVisibility.Public)

    const partyMutation = api.party.createParty.useMutation()

    const handlePartyTypeChange = (event: any) => {
        setType(event.target.value);
    };

    const handlePartyVisibilityChange = (event: any) => {
        setVisibility(event.target.value);
    };

    function createParty(e: any) {
        e.preventDefault()

        const createPartyDTO = {
            userId: props.userId,
            gameId: props.gameId,
            partyTitle: name,
            partyType: type,
            partyVisibility: visibility
        }
        
        partyMutation.mutate(createPartyDTO)
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
                        <input
                            id="partyName"
                            name="name"
                            type="text"
                            onChange={e => setName(e.target.value)}
                            minLength={1}
                            maxLength={50}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl mb-2">Party Type</h3>
                        <select id="partyType" value={type} onChange={handlePartyTypeChange}>
                            <option value={PartyType.Casual}>Casual</option>
                            <option value={PartyType.Competitive}>Competitive</option>
                        </select>
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl mb-2">Party Visibility</h3>
                        <select id="partyVisibility" value={visibility} onChange={handlePartyVisibilityChange}>
                            <option value={PartyVisibility.Public}>Public</option>
                            <option value={PartyVisibility.Private}>Private</option>
                        </select> 
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