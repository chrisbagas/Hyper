import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { MediaLink } from "../shared/MediaLink/MediaLink"

interface ProfileHeaderProps {
    data: any,
    connectAcc: any
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ data, connectAcc }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className=" mt-4">
                <div className="avatar">
                    <div className=" rounded-full h-24 w-24">
                        <img src={data?.image} />
                    </div>
                </div>

            </div>
            <div className=" ml-8 mt-4" >
                <h1 className="text-4xl font-bold font text-white">
                    {data?.username}
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="flex flex-col sm:flex-row ">
                        <img src={data?.country?.imageUrl ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/1280px-Flag_of_the_United_Nations.svg.png"} className="h-10 w-16" />
                        <div className="divider lg:divider-horizontal "></div>
                        <div className="flex flex-row items-center gap-2">
                            <div className="badge badge-lg border-none text-neutral-0 font-normal bg-accent-6 text-sm">Casual Gamer</div>
                        </div>
                    </div>


                    <div className="flex flex-row items-center gap-2">
                        <div className="badge badge-lg border-none text-neutral-0 font-normal bg-yellow-500 text-sm">Content Creator</div>
                    </div>

                </div>

                <h3 className="mt-4 text-white">{data?.bio}</h3>

                <div className="flex flex-col sm:flex-row gap-8 mt-4">
                    {connectAcc?.data?.connected && (<MediaLink accs = {connectAcc?.data?.connected}/>)}
                    
                </div>


            </div>

        </div>
    )
}
