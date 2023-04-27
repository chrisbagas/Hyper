import React from "react"
import { PartyMember, PartyMemberLevel, User } from "@prisma/client"
import { api } from "../../utils/api";

export interface PartyPlayerData {
    userId: string
    partyId: string
    isLeader: boolean
    matches: number | undefined
    kdr: number | undefined
    winrate: number | undefined
    partyMember: PartyMember & {
        user: User
    }
    refetch: () => void
}

const PartyPlayer = (props: PartyPlayerData) => {
    // enable kick buttons if the viewer is the leader of the party and the party member level is member
    const enableKickButton = props.isLeader && (props.partyMember.level != PartyMemberLevel.leader)
    const kickMutation = api.party.kickPartyMember.useMutation()

    function kick(e: any) {
        e.preventDefault()

        const kickDTO = {
            leaderUserId: props.userId,
            memberUserId: props.partyMember.userId,
            partyId: props.partyId
        }
        
        kickMutation.mutate(kickDTO)
        
        // refetch after 100 milliseconds
        setTimeout(() => props.refetch(), 100);
    }

    return (
        <>
            <div className="flex flex-row max-w-full h-auto justify-between bg-gray-500 p-4 my-4 rounded-xl align-bottom">
                <div className="flex flex-row">
                <img className="w-12 h-12 rounded-full object-cover"    
                    src={props.partyMember.user.image
                        ?? "https://media.hitekno.com/thumbs/2022/09/20/49670-meme-amogus/730x480-img-49670-meme-amogus.jpg"
                    }
                />
                <div className="flex flex-col ml-4">
                    <h2 className="flex flex-row font-semibold text-lg mb-1">
                        {props.partyMember.level == PartyMemberLevel.leader
                            ? <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="yellow" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                &nbsp;
                            </>
                            : <></>
                        }
                        {props.partyMember.userId == props.userId
                            ? <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                &nbsp;
                            </>
                            : <></>
                        }
                        {props.partyMember.user.username ?? "Unnamed Player"}
                    </h2>
                    <h3>
                        {props.matches ? <>Matches: {props.matches}</> : <></>}
                        {props.kdr ? <>| K/D: {props.kdr}</> : <></>}
                        {props.winrate ? <>| WR: {props.winrate}</> : <></>}
                    </h3>
                </div>
                </div>
                {enableKickButton
                    ? <button className="btn btn-circle bg-red-600 border-red-700 hover:bg-red-700" onClick={kick}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    : <></>
                }
            </div>
        </>
    )
}

export {PartyPlayer};