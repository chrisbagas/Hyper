import { type NextPage } from "next";
import React, {useState} from "react";
import { useRouter } from "next/router";
import { PartyType, PartyVisibility } from "@prisma/client";
import { api } from "../../../utils/api";
import { useSession } from "next-auth/react";
import { GameDashboardNav } from "../../../components/shared/GameDashboard/GameDashboardNav";

const PartyForm: NextPage = () => {
    const router = useRouter()
    const session = useSession()
    const [name, setName] = useState("")
    const [type, setType] = useState(PartyType.Casual)
    const [visibility, setVisibility] = useState(PartyVisibility.Public)
    const [error, setError] = useState("")

    const partyMutation = api.party.createParty.useMutation()
    const gameId = router.query.game
    const userId = session.data?.user.id
    const { data: game } = api.games.getById.useQuery({ id: gameId as string })

    const handlePartyTypeChange = (event: any) => {
        setType(event.target.value);
    };

    const handlePartyVisibilityChange = (event: any) => {
        setVisibility(event.target.value);
    };

    function createParty(e: any) {
        e.preventDefault()
        if (!userId) {
            alert("Please login before you create a party.")
            return
        }

        if (!name) {
            setError("Please fill the party name.")
            return
        }
        if (name.length > 50) {
            setError("Party name too long: must be less than 50 characters.")
            return
        }

        setError("")

        const createPartyDTO = {
            userId: userId,
            gameId: gameId,
            partyTitle: name,
            partyType: type,
            partyVisibility: visibility
        }
        
        partyMutation.mutate(createPartyDTO)

        setTimeout(() => router.push("/" + gameId + "/home"), 200)
    }

    return (
        <>
            <div className="p-16">
                <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
                <div className="flex flex-col justify-start w-full h-full p-8 bg-gray-700 text-white m-4 rounded-xl">
                    <div>
                        <h2 className="text-4xl font-bold mt-4 mb-12">
                            Create New Party
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                        <div>
                            <h3 className="font-semibold text-xl mb-2">Party Name</h3>
                            <input
                                className="bg-gray-500 w-full text-xl pl-4 py-4"
                                id="partyName"
                                value={name}
                                name="name"
                                type="text"
                                onChange={e => setName(e.target.value)}
                            />
                            {error
                                ? <p className="text-red-500 font-bold text-lg my-2">{error}</p>
                                : <></>
                            }
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl mb-2">Party Type</h3>
                            <select className="bg-gray-500 w-full text-xl pl-4 py-4 font-bold" id="partyType" value={type} onChange={handlePartyTypeChange}>
                                <option value={PartyType.Casual}>Casual</option>
                                <option value={PartyType.Competitive}>Competitive</option>
                            </select>
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl mb-2">Party Visibility</h3>
                            <select className="bg-gray-500 w-full text-xl pl-4 py-4 font-bold" id="partyVisibility" value={visibility} onChange={handlePartyVisibilityChange}>
                                <option value={PartyVisibility.Public}>Public</option>
                                <option value={PartyVisibility.Private}>Private</option>
                            </select> 
                        </div>
                    </div>
                    <div className="my-16">
                        <button onClick={createParty} className="btn bg-blue-500 hover:bg-blue-600 text-xl">Create Party</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PartyForm;