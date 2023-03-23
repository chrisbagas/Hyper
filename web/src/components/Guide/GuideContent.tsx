import React from "react"
import ReactMarkdown from "react-markdown"
import { CommunityPostType, ContentType } from "@prisma/client"

export interface GuideContentProps {
  type: CommunityPostType
  title: string
  content: string
  headerType: ContentType
  headerUrl: string
}

export const GuideContent: React.FC<GuideContentProps> = ({ type, title, content, headerType, headerUrl }) => {
  return (
    <div className="flex flex-col gap-y-8 px-16">
      <img className="object-cover aspect-video rounded-lg" src={headerUrl} />
      <div className="flex flex-col gap-y-3">
        <h1 className="text-xl text-neutral-0 font-bold">{title}</h1>
        <p className="text-sm text-base-4">Created by Alex Jones | Posted 24/02/2022 08:00</p>
        <ReactMarkdown className="flex flex-col">
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
