import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

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
                    {connectAcc?.data?.connected.map((acc: any) => {
                        if (acc.type === "instagram") {
                            return (
                                <Link href={`https://www.instagram.com/${acc.name}/`} key={acc?.type} className="text-white flex gap-2">
                                    <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center">
                                        <img src="https://media.discordapp.net/attachments/1096015724813746246/1096015770674270299/instagram.png?width=40&height=40" className="w-4 h-4" />
                                    </div>
                                    {acc?.name}
                                    <ArrowTopRightOnSquareIcon className="w-4" />
                                </Link>
                            );
                        } else if (acc.type === "riotgames") {
                            return (
                                <Link href="https://www.riotgames.com/" key={acc?.type} className="text-white flex gap-2">
                                    <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center">
                                        <img src="https://media.discordapp.net/attachments/1096015724813746246/1096020952124498010/image_35_Traced.png?width=18&height=18" className="w-3 h-3" />
                                    </div>
                                    {acc?.name}
                                    <ArrowTopRightOnSquareIcon className="w-4" />
                                </Link>
                            );
                        } else if (acc.type === "steam") {
                            return (
                                <Link href={`https://steamcommunity.com/profiles/${acc.id}/`}key={acc?.type} className="text-white flex gap-2">
                                    <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center">
                                        <img src="https://media.discordapp.net/attachments/1096015724813746246/1096020707420405831/steam.png?width=40&height=40" className="w-4 h-4" />
                                    </div>
                                    {acc?.name}
                                    <ArrowTopRightOnSquareIcon className="w-4" />
                                </Link>
                            );
                        } else if (acc.type === "youtube") {
                            return (
                                <Link href={`https://www.youtube.com/channel/${acc.id}`}key={acc?.type} className="text-white flex gap-2">
                                    <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center">
                                        <img src="https://media.discordapp.net/attachments/1096015724813746246/1096021420666015835/youtube.png?width=40&height=40" className="w-4 h-4" />
                                    </div>
                                    {acc?.name}
                                    <ArrowTopRightOnSquareIcon className="w-4" />
                                </Link>
                            );
                        } else {
                            return (
                                <Link href="" key={acc?.type} className="text-white flex gap-2">
                                    <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center">
                                    </div>
                                    {acc?.name}
                                    <ArrowTopRightOnSquareIcon className="w-4" />
                                </Link>
                            );
                        }
                    })}
                </div>


            </div>

        </div>
    )
}
