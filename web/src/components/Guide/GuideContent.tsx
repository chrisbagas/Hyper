import React from "react"
import ReactMarkdown from "react-markdown"
import { CommunityPostType, ContentType } from "@prisma/client"

export interface GuideContentProps {
  type: CommunityPostType
  title: string
  content: string
  headerType: ContentType
  headerUrl: string
  author: string
  postedAt: Date
}

const GuideTypeBadge: React.FC<{type:CommunityPostType}> = ({ type }) => {
  if (type === CommunityPostType.CLIP)
    return <div className="badge badge-lg border-none text-neutral-0 font-normal bg-accent-1 text-sm">Clip</div>
  return <div className="badge badge-lg border-none text-neutral-0 font-normal bg-accent-4 text-sm">Guide</div>
} 

const GuideHeader: React.FC<{type:ContentType, url:string}> = ({ type, url }) => {
  if (type === ContentType.IMAGE)
    return <img className="object-cover aspect-video rounded-lg" src={url} />
  return <iframe className="w-full aspect-video rounded-lg" src={url}></iframe>
}

export const GuideContent: React.FC<GuideContentProps> = ({ type, title, content, headerType, headerUrl, author, postedAt }) => {
  return (
    <div className="flex flex-col gap-y-8 px-16">
      <GuideHeader type={headerType} url={headerUrl}/>
      <div className="flex flex-col gap-y-3">
        <GuideTypeBadge type={type}/>
        <h1 className="text-xl text-neutral-0 font-bold">{title}</h1>
        <p className="text-sm text-base-4">{`Created by ${author} | Posted ${postedAt.getDate()}/${postedAt.getMonth()}/${postedAt.getFullYear()} ${('0'+postedAt.getHours()).slice(-2)}:${('0'+postedAt.getMinutes()).slice(-2)}`}</p>
        <ReactMarkdown className="flex flex-col">
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
