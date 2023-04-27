import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

interface MediaLinkProps {
    accs: any
}

export const MediaLink: React.FC<MediaLinkProps> = ({ accs }) => {
    return (
        <>
        {accs.map((acc: any)=>{
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
                <Link href={`https://steamcommunity.com/profiles/${acc.id}/`} key={acc?.type} className="text-white flex gap-2">
                    <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center">
                        <img src="https://media.discordapp.net/attachments/1096015724813746246/1096020707420405831/steam.png?width=40&height=40" className="w-4 h-4" />
                    </div>
                    {acc?.name}
                    <ArrowTopRightOnSquareIcon className="w-4" />
                </Link>
                );
          } else if (acc.type === "youtube") {
              return (
                <Link href={`https://www.youtube.com/channel/${acc.id}`} key={acc?.type} className="text-white flex gap-2">
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
        </>
                           
    )
}
