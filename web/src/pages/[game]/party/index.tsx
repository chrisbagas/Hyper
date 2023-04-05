import { type NextPage } from "next";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { GameDashboardNav } from "../../../components/shared/GameDashboard/GameDashboardNav";
import { PartyCard } from "../../../components/party/PartyCard";
import { PartyType, PartyVisibility } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";

const Party: NextPage = () => {
    const router = useRouter()
    const session = useSession()
    const [form, setForm] = useState(false)

    const gameId = router.query.game
    const userId = session.data?.user.id
    const { data: game } = api.games.getById.useQuery({ id: gameId as string })
    const parties = api.party.getByGame.useQuery({id: gameId as string}).data
    const userParty = userId ? api.party.getUserParty.useQuery(userId).data : null

    return (
        <>
            <div className="p-16">
                <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
                <div className="my-4">
                    <div className=" flex justify-between mb-4 mr-4">
                        <div>
                            <h1 className="text-4xl text-white">List Of All Parties:</h1>
                        </div>
                        <div>
                            {userParty
                                ? <></>
                                : <Link href={`/${gameId}/party/create`}>
                                    <button className="btn bg-blue-500 hover:bg-blue-600">Create New Party</button>
                                </Link>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-2">
                        {parties?.map(party => {
                            return <>
                                <div className="m-4">
                                    <PartyCard key={party.id} userId={userId ?? ''}
                                        partyId={party.id}
                                        gameId={party.gameId}
                                        title={party.partyTitle}
                                        minimalRank={undefined}
                                        visibility={party?.partyVisibility ?? PartyVisibility.Public}
                                        type={party?.partyType ?? PartyType.Casual}
                                        partyMembers={party.partyMembers}
                                        alreadyJoined={false} />
                                </div>
                            </>
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Party;
