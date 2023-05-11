import React from "react"
import ReactMarkdown from "react-markdown"

export const HyperMarkdownParser: React.FC<{content: string}> = ({ content }) => {
  return (
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
        code: ({node, ...props}) => <code className="px-1 bg-base-2" {...props}/>
      }}>
      {content}
    </ReactMarkdown>
  )
}
