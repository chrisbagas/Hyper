import React, { useState } from "react"
import { PartyVisibility, PartyType, PartyMember, User } from "@prisma/client"
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { ConfirmationModal } from "../shared/ConfirmationModal";

export interface PartyCardData {
  userId: string,
  partyId: string,
  gameId: string,
  title: string,
  partyCapacity: number,
  minimalRank: string | undefined,
  visibility: PartyVisibility,
  type: PartyType,
  partyMembers: (PartyMember & { user: User })[],
  alreadyJoined: boolean
  refetch: () => void
}

const PartyCard = (props: PartyCardData) => {
  const partyMutation = api.party.joinParty.useMutation()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  async function joinParty(e: any) {
    e.preventDefault()

    const joinPartyDTO = {
      userId: props.userId,
      partyId: props.partyId,
      gameId: props.gameId
    }

    try {
      await partyMutation.mutateAsync(joinPartyDTO).then(() => {
        if (router.asPath.slice(-4) == "home") {
          props.refetch()
        }
        else {
          router.push("/" + props.gameId + "/home")
        }
      })
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.message)
    }
  }

  const memberAvatars = props.partyMembers.map((partyMember) =>
    <div className="avatar" key={partyMember.userId}>
      <div className="w-12 rounded-full">
        <img src={partyMember.user.image} />
      </div>
    </div>
  )
  let i = props.partyMembers.length
  while (i < props.partyCapacity) {
    memberAvatars.push(
      <>
        <div className="avatar">
          <div className="w-12 rounded-full bg-gray-200 opacity-25">
            
          </div>
        </div>
      </>
    )
    i++;
  }

  return (
    <div className="flex flex-col justify-start w-full h-full p-8 bg-gray-700 text-white rounded-lg">

      {/* modal for action confirmation */}
      <ConfirmationModal {...{
        headerText: "Confirm Action",
        contentText: "Are you sure you want to join " + props.title + "?",
        isModalOpen,
        setIsModalOpen,
      }}>
        <button 
          className="btn btn-primary bg-primary-main border-primary-border hover:bg-primary-pressed hover:border-primary-pressed normal-case gap-2" 
          onClick={(e)=>{
            joinParty(e)
            setIsModalOpen(false)
          }}
        >
          JOIN PARTY
        </button>
      </ConfirmationModal>

      {/* modal for error message */}
      <ConfirmationModal {...{
        headerText: "Error",
        contentText: errorMessage,
        isModalOpen: isError,
        setIsModalOpen: setIsError,
      }}>
        <button 
          className="btn btn-primary bg-primary-main border-primary-border hover:bg-primary-pressed hover:border-primary-pressed normal-case gap-2" 
          onClick={(e)=>{
            setIsError(false)
          }}
        >
          OK
        </button>
      </ConfirmationModal>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div className="bg-green-500 mr-2 py-1 px-2 rounded-xl text-sm">
            {props.visibility}
          </div>
          <div className="bg-red-400 ml-2 py-1 px-2 rounded-xl text-sm">
            {props.type}
          </div>
        </div>
        <div>
          <h3 className="opacity-50 text-xl"></h3>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold my-4">
          {props.title}
        </h1>
      </div>
      {props.minimalRank
        ? <>
          <div className="flex flex-row">
            <p className="text-white text-opacity-50 mr-2">
              Minimal Rank:
            </p>
            {props.minimalRank}
          </div>
        </>
        : <></>
      }
      <div className="flex flex-row align-center justify-between mt-10">
        <div className="flex flex-row">
          <div className="bg-gray-500 p-2 rounded-lg font-bold text-xl h-auto">
            {props.partyMembers.length}/{props.partyCapacity}
          </div>
          <div className="avatar-group -space-x-4 mx-8">

            {memberAvatars}

          </div>
        </div>
        <div>
          {props.alreadyJoined
            ? <button className="btn bg-gray-400 hover:bg-gray-500">Already In Party</button>
            : <button onClick={() => setIsModalOpen(true)} className="btn text-white text-xl bg-green-500 hover:bg-green-600 normal-case">Join Party</button>
          }
        </div>
      </div>
    </div>
  )
}

export { PartyCard };
