import { type NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { PartyType, PartyVisibility } from "@prisma/client";
import { api } from "../../../utils/api";
import { useSession } from "next-auth/react";
import { GameDashboardNav } from "../../../components/shared/GameDashboard/GameDashboardNav";
import Link from "next/link";
import { ConfirmationModal } from "../../../components/shared/ConfirmationModal";

const PartyForm: NextPage = () => {
    const router = useRouter()
    const session = useSession()

    const createPartyMutation = api.party.createParty.useMutation()
    const editPartyMutation = api.party.updateParty.useMutation()
    const gameId = router.query.game
    const userId = session.data?.user.id
    const { data: game } = api.games.getById.useQuery({ id: gameId as string })
    const userParty = api.party.getUserParty.useQuery(userId as string).data

    const [name, setName] = useState(userParty?.partyTitle ?? "")
    const [type, setType] = useState(userParty?.partyType ?? PartyType.Casual)
    const [visibility, setVisibility] = useState(userParty?.partyVisibility ?? PartyVisibility.Public)
    const [error, setError] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePartyTypeChange = (event: any) => {
    setType(event.target.value);
  };

  const handlePartyVisibilityChange = (event: any) => {
    setVisibility(event.target.value);
  };

    function createParty(e: any) {
        e.preventDefault()

        const createPartyDTO = {
            userId: userId as string,
            gameId: gameId as string,
            partyTitle: name,
            partyType: type,
            partyVisibility: visibility
        }
        
        createPartyMutation.mutate(createPartyDTO)

        setTimeout(() => router.push("/" + gameId + "/home"), 200)
    }

    function editParty(e: any) {
        e.preventDefault()

        const editPartyDTO = {
            partyId: userParty?.id as string,
            userId: userId as string,
            partyTitle: name as string,
            partyType: type,
            partyVisibility: visibility
        }

        editPartyMutation.mutate(editPartyDTO)

        setTimeout(() => router.push("/" + gameId + "/home"), 200)
    }

    return (
        <>
            <div className="p-16">
                <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
                
                <ConfirmationModal {...{
                    headerText: "Confirm Action",
                    contentText: userParty ? "Are you sure you want to update the party?" : "Are you sure you want to create new party?",
                    isModalOpen,
                    setIsModalOpen,
                }}>
                    <button 
                        className="btn btn-primary bg-primary-main border-primary-border hover:bg-primary-pressed hover:border-primary-pressed normal-case gap-2" 
                        onClick={(e)=>{
                            if (userParty)
                                editParty(e)
                            else
                                createParty(e)
                            setIsModalOpen(false)
                        }}
                    >
                        {userParty ? "UPDATE PARTY" : "CREATE PARTY"}
                    </button>
                </ConfirmationModal>

                <div className=" flex justify-between my-4 mr-4">
                    <div>
                    <Link href={`/${gameId}/party`}>
                        <button className="btn bg-opacity-0 hover:bg-opacity-0 border-0 normal-case">
                            Go Back
                            &nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                    </Link>
                        
                    </div>
                    <div>
                        <button className={`btn text-lg normal-case ${userParty ? "bg-green-600 bg-opacity-25 border-green-500 hover:bg-opacity-100 hover:bg-green-600": "bg-blue-500 hover:bg-blue-600"}`}
                            onClick={() => {
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
                                if (typeof gameId !== "string") {
                                    return
                                }
                                setError("")
                                setIsModalOpen(true)
                            }}
                        >
                            {userParty
                                ? <>
                                    Save Party Details
                                </>
                                : <>
                                    Create Party
                                    &nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                    </svg>
                                </>
                            }
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-start w-full h-full p-8 bg-gray-700 text-white m-4 rounded-xl">
                    <div>
                        <h2 className="text-4xl font-bold mt-4 mb-12">
                        {userParty ? "Update Party" : "Create New Party"}
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-lg mb-2">Party Name</h3>
                            <input
                                className="bg-gray-500 w-full text-xl pl-4 py-4 border border-gray-400 rounded-lg"
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
                            <h3 className="text-lg mb-2">Party Type</h3>
                            <select className="bg-gray-500 w-full text-xl pl-4 py-4 font-bold border border-gray-400 rounded-lg" id="partyType" value={type} onChange={handlePartyTypeChange}>
                                <option value={PartyType.Casual}>Casual</option>
                                <option value={PartyType.Competitive}>Competitive</option>
                            </select>
                        </div>
                        <div>
                            <h3 className="text-lg mb-2">Party Visibility</h3>
                            <select className="bg-gray-500 w-full text-xl pl-4 py-4 font-bold border border-gray-400 rounded-lg" id="partyVisibility" value={visibility} onChange={handlePartyVisibilityChange}>
                                <option value={PartyVisibility.Public}>Public</option>
                                <option value={PartyVisibility.Private}>Private</option>
                            </select> 
                        </div>
                    </div>
                </div>
            </div>
          </>
  )
}

export default PartyForm;
