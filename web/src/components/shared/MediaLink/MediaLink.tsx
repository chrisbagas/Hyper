import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"
import Link from 'next/link';

interface MediaLinkProps {
  accs: any[];
}

interface MediaLink {
  type: string;
  url: string;
  imgSrc: string;
}

const mediaLinks: MediaLink[] = [
  {
    type: 'instagram',
    url: 'https://www.instagram.com/',
    imgSrc: 'https://media.discordapp.net/attachments/1096015724813746246/1096015770674270299/instagram.png?width=40&height=40'
  },
  {
    type: 'riotgames',
    url: 'https://www.riotgames.com/',
    imgSrc: 'https://media.discordapp.net/attachments/1096015724813746246/1096020952124498010/image_35_Traced.png?width=18&height=18'
  },
  {
    type: 'steam',
    url: 'https://steamcommunity.com/profiles/',
    imgSrc: 'https://media.discordapp.net/attachments/1096015724813746246/1096020707420405831/steam.png?width=40&height=40'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/channel/',
    imgSrc: 'https://media.discordapp.net/attachments/1096015724813746246/1096021420666015835/youtube.png?width=40&height=40'
  },
  {
    type: 'tiktok',
    url: 'https://www.tiktok.com/@',
    imgSrc: 'https://media.discordapp.net/attachments/1096015724813746246/1101012112756719746/tiktok.png?width=40&height=40'
  },
  {
    type: 'spotify',
    url: 'https://www.spotify.com/id-id/account/overview/',
    imgSrc: 'https://media.discordapp.net/attachments/1096015724813746246/1101013709041696808/spotify.png?width=40&height=40'
  },
  {
    type: 'github',
    url: 'https://github.com/',
    imgSrc: 'https://media.discordapp.net/attachments/1096015724813746246/1101014857484083240/github.png?width=40&height=40'
  },
  {
    type: 'twitch',
    url: 'https://www.twitch.tv/',
    imgSrc: 'https://media.discordapp.net/attachments/1096015724813746246/1101018979570561074/twitch.png?width=28&height=30'
  }
];

const getMediaLink = (type: string, name: string, id: string) => {
  const link = mediaLinks.find((mediaLink) => mediaLink.type === type);
  if (!link) return null;

  const url = `${link.url}${type === 'steam' || type === 'youtube' ? id : name}`;
  const key = `${type}-${name || id}`;

  return (
    <Link href={url} key={key} className="text-white flex items-center gap-2 mb-1 w-full sm:w-auto">
      <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center">
      { type === 'riotgames' ? (
            <img src={link.imgSrc} className="w-3 h-3" />
          ) : (
            <img src={link.imgSrc} className="w-4 h-4" />
          )}
        
      </div>
      {name}
      <ArrowTopRightOnSquareIcon className="w-4" />
    </Link>
  );
};

export const MediaLinks: React.FC<MediaLinkProps> = ({ accs }) => {
    return (
        <>
        {accs.map((acc: any) => {
            return getMediaLink(acc.type, acc.name, acc.id);
            })}
        </>
    )
}
