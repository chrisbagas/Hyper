
import { Game } from "@prisma/client"
import { useRouter } from "next/router"

interface ProfileCardProps {
    connectAcc: any
}
interface GameCard{
    game: Game,
    gameIdentifier:string

}

export const ProfileCard: React.FC<ProfileCardProps> = ({ connectAcc }) => {
    const router = useRouter()
    return (
        <>
        <div className="flex flex-row flex-wrap ">

            {connectAcc?.data?.gameAkuns.map((game: GameCard) =>
                <div key={game.game.id} className="card bg-base-2 shadow-xl m-4 grid  flex-grow rounded-box " onClick={() => router.push(`/result?${game.gameIdentifier}`)}>
                    <div className="card-body gap-4 lg:gap-0">

                        <div className="flex flex-row gap-6">
                            <figure>
                                <img className="bg-white rounded-md w-16 h-16" src={game.game.logoUrl} />
                            </figure>

                            <div className="flex flex-col gap-2">
                                <h2 className="card-title text-neutral-0 font-bold">{game.game.name}</h2>

                                <div className="flex flex-col sm:flex-row gap-4">

                                    <div className="flex flex-row items-center gap-2">

                                        <div className="badge badge-lg border-none text-neutral-0 font-normal bg-blue-500 text-sm">First-Person Shooter</div>
                                    </div>

                                    <div className="flex flex-row items-center gap-2">
                                        <div className="badge badge-lg border-none text-neutral-0 font-normal bg-accent-6 text-sm">Competitive</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
        </>

    )
}
