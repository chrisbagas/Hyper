import React from "react"

export interface GuideCardProps{
    title:string
    username?:string
    createdAt:Date
    content?:string
}

export const GuideCard: React.FC<GuideCardProps> = ({ title,username,createdAt,content }) => (
    <div className="card w-full bg-base-100 shadow-xl">
        <figure><img src="https://dafunda.com/wp-content/uploads/2021/03/CSGO-steam-terhapus.jpg" alt="Shoes" /></figure>
        <div className="card-body">
            <div className="badge badge-warning">Guide</div>
            <h2 className="card-title">
                {title}
            </h2>
            <p>Created by {username} | Posted { createdAt.toLocaleString() }</p>
            <p>{content}</p>
        </div>
    </div>
)
