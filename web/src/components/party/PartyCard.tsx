import React from "react"
import { PartyVisibility, PartyType, PartyMember } from "@prisma/client"
import { api } from "../../utils/api";
import { useRouter } from "next/router";

export interface PartyCardData {
    userId: string,
    partyId: string,
    gameId: string,
    title: string,
    partyCapacity: number,
    minimalRank: string | undefined,
    visibility: PartyVisibility,
    type: PartyType,
    partyMembers: PartyMember[],
    alreadyJoined: boolean
}

const PartyCard = (props: PartyCardData) => {
    const partyMutation = api.party.joinParty.useMutation()
    const router = useRouter()

    function joinParty(e: any) {
        e.preventDefault()

        const joinPartyDTO = {
            userId: props.userId,
            partyId: props.partyId,
            gameId: props.gameId
        }

        partyMutation.mutate(joinPartyDTO)

        if (router.asPath.slice(-4) == "home") {
            // use refetch instead after refactor
            router.reload()
        }
        else {
            setTimeout(() => router.push("/" + props.gameId + "/home"), 200)
        }
    }

    const memberAvatars = props.partyMembers.map((partyMember) =>
        <div className="avatar" key={partyMember.userId}>
            <div className="w-12 rounded-full">
                {/* <img src="https://media.hitekno.com/thumbs/2022/09/20/49670-meme-amogus/730x480-img-49670-meme-amogus.jpg" /> */}
                <img src={partyMember.user.image} />
            </div>
        </div>
    )
    let i = props.partyMembers.length
    while (i < props.partyCapacity) {
        memberAvatars.push(
            <>
                <div className="avatar">
                    <div className="w-12 rounded-full bg-gray-200 opacity-50">
                    </div>
                </div>
            </>
        )
        i++;
    }

    return (
        <>
            <div className="flex flex-col justify-start w-full h-full p-8 bg-gray-700 text-white rounded-lg">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <div className="bg-red-400 mx-2 py-1 px-2 rounded-lg text-sm">
                            {props.visibility}
                        </div>
                        <div className="bg-green-500 mx-2 py-1 px-2 rounded-lg text-sm">
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
                        <div className="bg-gray-500 p-2 rounded-lg font-bold h-auto">
                            {props.partyMembers.length}/{props.partyCapacity}
                        </div>
                        <div className="avatar-group -space-x-4 mx-8">

                            {memberAvatars}
                            
                        </div>
                    </div>
                    <div>
                        {props.alreadyJoined
                            ? <button className="btn bg-gray-400 hover:bg-gray-500">Already In Party</button>
                            : <button onClick={joinParty} className="btn bg-green-500 hover:bg-green-600">Join Party</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export {PartyCard};