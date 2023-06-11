import { ContentType } from "@prisma/client"
import Link from "next/link"
import React from "react"

import { truncate } from "../../utils/truncate"

export interface GuideCardProps {
  title: string
  username?: string
  createdAt: Date
  content?: string
  status: string
  gameId: string
  postId: string
  guidesLoc: string
  headerUrl: string
  headerType: ContentType
}

export const GuideCard: React.FC<GuideCardProps> = ({ title, username, createdAt, content, status, gameId, postId, guidesLoc, headerUrl, headerType }) => { 

  function getUrl(url: string, type: ContentType){
    if (type == ContentType.IMAGE) {
      return url
    }
    const array = url.match(/^https:\/\/(?:www\.)?youtube\.com\/embed\/(.+)$/)
    if (array == null) {
      return "https://www.howtogeek.com/wp-content/uploads/2021/08/YouTube-logo-hero-1.png?height=200p&trim=2,2,2,2&crop=16:9"
    }
    return `https://img.youtube.com/vi/${array[1]}/sddefault.jpg`
  }

  return (
    <Link href={`/${gameId}/${guidesLoc}/${postId}`} className="transition-all duration-[500ms] ease-in-out md:h-full hover:-translate-y-2">
      <div className="card flex flex-col justify-between w-full h-full bg-base-100 shadow-xl">
        <img src={getUrl(headerUrl, headerType)} className="aspect-video object-cover rounded-t-xl" alt="Header" />
        <div className="card-body">
          <div>
            {status === "PUBLISHED" ? (
              <div className="badge badge-success mr-2">{status}</div>
            ) : (
              <div className="badge mr-2">{status}</div>
            )}
            <div className="badge badge-warning">Guide</div>
          </div>
          <h2 className="card-title">
            {truncate(title, 48)}
          </h2>
          <p>Created by {username} | Posted {createdAt.toLocaleString()}</p>
          <p>{truncate(String(content), 200)}</p>
        </div>
      </div>
    </Link>
  )
}
