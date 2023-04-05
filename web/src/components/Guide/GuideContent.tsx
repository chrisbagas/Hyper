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
    <div className="flex flex-col gap-y-8 px-16 pb-16">
      <GuideHeader type={headerType} url={headerUrl}/>
      <div className="flex flex-col gap-y-3">
        <GuideTypeBadge type={type}/>
        <h1 className="text-xl text-neutral-0 font-bold">{title}</h1>
        <p className="text-sm text-base-4">{`Created by ${author} | Posted ${postedAt.getDate()}/${postedAt.getMonth()+1}/${postedAt.getFullYear()} ${('0'+postedAt.getHours()).slice(-2)}:${('0'+postedAt.getMinutes()).slice(-2)}`}</p>
        <ReactMarkdown 
          className="flex flex-col space-y-4"
          components={{
            p: ({node, ...props}) => <p className="text-neutral-0 text-base" {...props} />,
            h1: ({node, ...props}) => <h1 className="text-neutral-0 text-3xl font-bold" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-neutral-0 text-2xl font-bold" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-neutral-0 text-xl font-bold" {...props} />,
            h4: ({node, ...props}) => <h4 className="text-neutral-0 text-lg font-bold" {...props} />,
            h5: ({node, ...props}) => <h5 className="text-neutral-0 text-base font-bold" {...props} />,
            h6: ({node, ...props}) => <h6 className="text-neutral-0 text-sm font-bold" {...props} />,
            a: ({node, ...props}) => <a className="hover:underline text-accent-7 transition-all" {...props} />,
            ul: ({node, depth, ...props}) => <ul className={`text-neutral-0 list-disc list-inside ml-${depth*5}`} {...props} />,
            ol: ({node, depth, ...props}) => <ol className={`text-neutral-0 list-decimal list-inside ml-${depth*5}`} {...props} />,
            pre: ({node, ...props}) => <pre className="p-4 bg-base-1 text-base-5" {...props} />,
            blockquote: ({node, ...props}) => <blockquote className="p-4 my-4 border-l-4 border-gray-500 bg-gray-800" {...props}/>,
            code: ({node, ...props}) => <code className="bg-base-2" {...props}/>
          }}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
