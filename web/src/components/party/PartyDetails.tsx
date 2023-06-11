import React, {useState} from "react"
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { PartyMember, PartyMemberLevel, Game } from "@prisma/client";
import { ConfirmationModal } from "../shared/ConfirmationModal";
import Link from "next/link";

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  let isLeader = false

  // check if the user is the leader of the party or not
  for (const partyMember of props.partyMembers) {
    if (partyMember.userId == props.userId && partyMember.level == PartyMemberLevel.leader) {
      isLeader = true
      break
    }
  }

  const deleteOrLeaveString = isLeader ? "delete" : "leave"

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

      <ConfirmationModal {...{
        headerText: "Confirm Action",
        contentText: `Are you sure you want to ` + deleteOrLeaveString  + " " + props.title + "?",
        isModalOpen,
        setIsModalOpen,
      }}>
        <button 
          className="btn btn-primary bg-primary-main border-primary-border hover:bg-primary-pressed hover:border-primary-pressed normal-case gap-2" 
          onClick={(e)=>{
            if (isLeader)
              deleteParty(e)
            else
              leaveParty(e)
            setIsModalOpen(false)
          }}
        >
          {`${deleteOrLeaveString.toUpperCase()} PARTY`}
        </button>
      </ConfirmationModal>

        <div className="mb-4">
          <h1 className="text-2xl font-bold flex flex-row">
            Party Detail
            &nbsp;
            <Link href={`/${props.game.id}/party/create`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </Link>

            </h1>
        </div>
        <div>
          <h2 className="my-4 text-xl flex flex-row">
            <div className="text-white text-opacity-50">Party Name:</div> 
            &nbsp;
            {props.title}
          </h2>
          <h2 className="my-4 text-xl flex flex-row">
            <div className="text-white text-opacity-50">Game: </div>
            &nbsp;
            {props.game.name}
          </h2>
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
          <a href={props.discordVoiceLink ?? "#"} target="_blank" rel="noreferrer">
            <button className="btn bg-blue-500 hover:bg-blue-600 mr-4 normal-case text-lg">Join Discord Voice</button>
          </a>
          <button onClick={() => {setIsModalOpen(true)}} className="btn bg-red-600 bg-opacity-25 border-red-500 hover:bg-opacity-100 hover:bg-red-600">{`${deleteOrLeaveString} Party`}</button>
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
