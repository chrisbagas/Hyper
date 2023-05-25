import React from "react";
import { Code, FormatBold, FormatItalic, FormatListBulleted, FormatListNumbered, FormatQuote, HorizontalRule, Image } from "@mui/icons-material"
import { LinkIcon } from "@heroicons/react/24/solid"
import { Post } from "./GuideForm";

interface GuideContentEditorProps {
  className?: string,
  onChange:(event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>void,
  content: string,
  setPostData:React.Dispatch<React.SetStateAction<Post>>,
  postData:Post,
}

export const GuideContentEditor: React.FC<GuideContentEditorProps> = ({ className, onChange, content, setPostData, postData }) => {
  const textEditorRef = React.useRef<HTMLTextAreaElement>(null)
  const textAreaObject = textEditorRef.current as HTMLTextAreaElement

  function getSelection(){
    textAreaObject.focus()
    return {
      startIndex: textAreaObject.selectionStart, 
      endIndex: textAreaObject.selectionEnd
    }
  }

  function finishHandler(newText: string, startRange: number, endRange: number){
    setPostData({
      ...postData,
      ["content"]: newText
    })
    setTimeout(() => {
       textAreaObject.focus()
       textAreaObject.setSelectionRange(startRange, endRange)
    }, 10)
  }

  function insertBetween(insert: string){
    const {startIndex, endIndex} = getSelection()
    const text = content
    const newText = text.substring(0, startIndex) + insert + text.substring(startIndex, endIndex) + insert + text.substring(endIndex)
    finishHandler(newText, startIndex+insert.length, endIndex+insert.length)
  }

  function insertAtLineStart(insert: string){
    let {startIndex, endIndex} = getSelection()
    const text = content
    while (startIndex > 0){
      if (text.substring(startIndex-1, startIndex) === '\n') {
        break
      }
      startIndex -= 1
    }
    while (endIndex < text.length){
      if (text.substring(endIndex, endIndex+1) === '\n'){
        break
      }
      endIndex += 1
    }
    const newText = text.substring(0, startIndex) + insert + text.substring(startIndex)
    finishHandler(newText, startIndex+insert.length, endIndex+insert.length)
  }

  function insertAtNewLine(insert: string){
    let {startIndex} = getSelection()
    let text = content
    while (startIndex < text.length){
      if (text.substring(startIndex, startIndex+1) === '\n'){
        break
      }
      startIndex += 1
    }
    if (startIndex == text.length){
      text = text + '\n'
    }
    startIndex += 1
    const newText = text.substring(0, startIndex) + insert + text.substring(startIndex)
    finishHandler(newText, startIndex+insert.length, startIndex+insert.length)
  }

  function insertInLine(insert: string){
    const {endIndex} = getSelection()
    const text = content
    const newText = text.substring(0, endIndex) + insert + text.substring(endIndex)
    finishHandler(newText, endIndex+insert.length, endIndex+insert.length)
  }

  return (
    <div className={className}>
      <label className="label">
        <span className="label-text text-neutral-0">Post Content</span>
      </label>
      <div className="flex flex-col h-[536px]">
        <div className="flex flex-wrap h-fit w-full bg-base-1 border border-b-0 border-base-3 rounded-t-lg p-2 gap-1">
          <button className="w-[27px] transition ease-out hover:bg-base-2 rounded-sm active:scale-90 tooltip" data-tip="Bold" onClick={() => {
            insertBetween("**")
          }}><FormatBold className="w-5" /></button>
          <button className="w-[27px] transition ease-out hover:bg-base-2 rounded-sm active:scale-90 tooltip" data-tip="Italic" onClick={() => {
            insertBetween("*")
          }}><FormatItalic className="w-5" /></button>
          <button className="w-[27px] transition ease-out hover:bg-base-2 rounded-sm active:scale-90 tooltip" data-tip="Header 1" onClick={() => {
            insertAtLineStart("# ")
          }}><p className="text-center font-bold text-sm">H1</p></button>
          <button className="w-[27px] transition ease-out hover:bg-base-2 rounded-sm active:scale-90 tooltip" data-tip="Header 2" onClick={() => {
            insertAtLineStart("## ")
          }}><p className="text-center font-bold text-sm">H2</p></button>
          <button className="w-[27px] transition ease-out hover:bg-base-2 rounded-sm active:scale-90 tooltip" data-tip="Header 3" onClick={() => {
            insertAtLineStart("### ")
          }}><p className="text-center font-bold text-sm">H3</p></button>
          <div className="w-[0.5px] bg-base-3"></div>
          <button className="flex w-[27px] items-center justify-center transition ease-out hover:bg-base-2 rounded-sm active:scale-90 tooltip" data-tip="Insert Link" onClick={() => {
            insertInLine("[title](https://www.example.com)")
          }}><LinkIcon className="w-4" /></button>
          <button className="w-[27px] transition ease-out hover:bg-base-2 rounded-sm active:scale-90 tooltip" data-tip="Insert Quote" onClick={() => {
            insertAtLineStart("> ")
          }}><FormatQuote className="w-5" /></button>
          <button className="w-[27px] transition ease-out hover:bg-base-2 rounded-sm active:scale-90 tooltip" data-tip="Insert Code Block" onClick={() => {
            insertBetween("\n```\n")
          }}><Code className="w-5" /></button>
          <button className="w-[27px] transition ease-out hover:bg-base-2 rounded-sm active:scale-90 tooltip" data-tip="Insert Image" onClick={() => {
            insertInLine(" ![alt text](<image link here>)")
          }}><Image className="w-5" /></button>
          <div className="w-[0.5px] bg-base-3"></div>
          <button className="w-[27px] transition ease-out hover:bg-base-2 rounded-sm active:scale-90 tooltip" data-tip="Unordered List" onClick={() => {
            insertAtLineStart("- ")
          }}><FormatListBulleted className="w-5" /></button>
          <button className="w-[27px] transition ease-out hover:bg-base-2 rounded-sm active:scale-90 tooltip" data-tip="Ordered List" onClick={() => {
            insertAtLineStart("1. ")
          }}><FormatListNumbered className="w-5" /></button>
          <button className="w-[27px] transition ease-out hover:bg-base-2 rounded-sm active:scale-90 tooltip" data-tip="Insert Separator" onClick={() => {
            insertAtNewLine("***\n")
          }}><HorizontalRule className="w-5" /></button>
        </div>
        <textarea 
          id="content"
          className="textarea border-t-0 bg-base-2 border-base-3 placeholder:text-base-4 text-neutral-0 h-[504px] rounded-t-none focus:outline-0" 
          placeholder="This post contains a match replay and ..."
          value={content}
          onChange={onChange}
          ref={textEditorRef}
        >
        </textarea>
      </div>
    </div>
  )
}
