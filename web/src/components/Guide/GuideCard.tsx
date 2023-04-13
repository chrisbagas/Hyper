import Link from "next/link"
import React from "react"

export interface GuideCardProps {
  title: string
  username?: string
  createdAt: Date
  content?: string
  status: string
  gameId: string
  postId: string
  guidesLoc: string
  headerUrl?: string
}

export const GuideCard: React.FC<GuideCardProps> = ({ title, username, createdAt, content, status, gameId, postId, guidesLoc, headerUrl }) => (
  <Link href={`/${gameId}/${guidesLoc}/${postId}`} className="md:h-full">
    <div className="card flex flex-col justify-between w-full h-full bg-base-100 shadow-xl">
      <img src={headerUrl} className="aspect-video object-cover rounded-t-xl" alt="Header" />
      <div className="card-body">
        <div>
          {status === "PUBLISHED" ? (
            <div className="badge badge-success mr-2">{status}</div>
          ) : (
            <div className="badge mr-2">{status}</div>
          )}
          <div className="badge badge-warning">Guide</div>
        </div>
        <h2 className="card-title truncate">
          {title}
        </h2>
        <p>Created by {username} | Posted {createdAt.toLocaleString()}</p>
        <p className="truncate">{content}</p>
      </div>
    </div>
  </Link>
)
