import React from "react"
import { PartyPlayer } from "./PartyPlayer"
import { PartyMember, User } from "@prisma/client"

export interface PartyPlayerListData {
  userId: string
  partyCapacity: number
  partyMembers: (PartyMember & { user: User })[]
}

const PartyPlayerList = (props: PartyPlayerListData) => {
  const partyPlayers = props.partyMembers.map((partyMember) =>
    <PartyPlayer
      key={partyMember.userId}
      userId={props.userId}
      matches={undefined}
      kdr={undefined}
      winrate={undefined}
      partyMember={partyMember}
    />
  )
  let i = props.partyMembers.length
  while (i < props.partyCapacity) {
    partyPlayers.push(
      <>
        <div className="flex flex-row max-w-full h-auto bg-gray-500 p-4 my-4 rounded-xl align-bottom">
          <div className="w-12 h-12 bg-white opacity-50 rounded-full object-cover"></div>
          <h2 className="font-semibold text-lg ml-6 opacity-50">
            Empty Slot
          </h2>
        </div>
      </>
    )
    i++;
  }

  return (
    <>
      <div className="flex flex-col justify-start w-full h-auto p-8 bg-gray-700 text-white">
        <div className="flex flex-row">
          <div className="text-2xl font-bold">
            Player List
          </div>
          <div className="bg-gray-500 p-2 ml-10 rounded-lg font-bold">
            {props.partyMembers.length}/{props.partyCapacity}
          </div>
        </div>

        {partyPlayers}

      </div>
    </>
  )
}

export { PartyPlayerList };
