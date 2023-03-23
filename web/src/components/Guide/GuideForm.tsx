import { CommunityPostStatus, CommunityPostType, ContentType } from "@prisma/client"
import React, { useState } from "react"
import { EyeIcon, FolderPlusIcon, LinkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { GuideTopButtonGroup } from "./GuideTopButtonGroup"

export interface Post {
  type:CommunityPostType|undefined,
  title:string,
  content:string,
  headerType:ContentType|undefined,
  headerUrl:string,
}

export interface GuideFormProps {
  postData:Post,
  errorMessage:string,
  isSuccess:boolean,
  isSubmitting:boolean,
  onChange:(event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>void,
  onSubmit:(event: React.SyntheticEvent, status: CommunityPostStatus, isPreview: boolean)=>Promise<void>,
  gameId:string,
}

export const GuideForm: React.FC<GuideFormProps> = ({ postData, errorMessage, isSuccess, isSubmitting, onChange, onSubmit, gameId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-6">
        
        <GuideTopButtonGroup className="px-8" returnUrl={`/${gameId}/your-guides`}>
          <div className="flex justify-between gap-2">
            <button className={`flex btn btn-ghost normal-case gap-2 ${isSubmitting && 'btn-disabled'}`} onClick={(e)=>onSubmit(e, CommunityPostStatus.DRAFT, false)}><FolderPlusIcon className="w-4"/> Save as Draft</button>
            <button className={`flex btn btn-ghost normal-case gap-2 ${isSubmitting && 'btn-disabled'}`} onClick={(e)=>onSubmit(e, CommunityPostStatus.DRAFT, true)}><EyeIcon className="w-4"/> Save & Preview</button>
            <button className={`flex btn btn-primary bg-primary-main border-primary-border hover:bg-primary-pressed hover:border-primary-pressed normal-case gap-2 ${isSubmitting && 'btn-disabled'}`} onClick={()=>setIsModalOpen(true)}><PaperAirplaneIcon className="w-4"/> Save & Publish Post</button>
          </div>
        </GuideTopButtonGroup>

        <div className="form-control w-full px-8">
          <label className="label">
            <span className="label-text">Post Title</span>
          </label>
          <input 
            type="text" 
            id="title"
            placeholder="How to Win a match" 
            className="input input-bordered w-full" 
            value={postData.title} 
            onChange={onChange}
          />
        </div>

        <div className="flex justify-between px-8 gap-6">
          <div className="form-control w-1/4">
            <label className="label">
              <span className="label-text">Header Attachment Type</span>
            </label>
            <select id="headerType" className="select w-full" value={postData.headerType} onChange={onChange}>
              <option disabled selected value={undefined}>Select header type</option>
              <option value={ContentType.IMAGE}>Image</option>
              <option value={ContentType.VIDEO}>Video</option>
            </select>
            <label className="label">
              <span className="label-text-alt">Please select the attachment type</span>
            </label>
          </div>

          <div className="form-control w-3/4">
            <label className="label">
              <span className="label-text">Header Attachment Link</span>
            </label>
            <label className="input-group">
              <span><LinkIcon className="w-4"/></span>
              <input 
                type="text" 
                id="headerUrl"
                placeholder="www.medal.tv/001ojiad0983q09" 
                className="input input-bordered w-full" 
                value={postData.headerUrl}
                onChange={onChange}
              />
            </label>
            <label className="label">
              <span className="label-text-alt">Only supports link or files provided by selected attachment type</span>
            </label>
          </div>
        </div>

        <div className="form-control w-full px-8">
          <label className="label">
            <span className="label-text">Select Post Type</span>
          </label>
          <select id="type" className="select w-full" value={postData.type} onChange={onChange}>
            <option disabled selected value={undefined}>Select post type</option>
            <option value={CommunityPostType.CLIP}>Clip</option>
            <option value={CommunityPostType.GUIDE}>Guide</option>
          </select>
        </div>

        <div className="form-control w-full px-8">
          <label className="label">
            <span className="label-text">Post Content</span>
          </label>
          <textarea 
            id="content"
            className="textarea" 
            placeholder="This post contains a match replay and ..."
            value={postData.content}
            onChange={onChange}
          >
          </textarea>
        </div>
        
        <div className="toast">
          {errorMessage && <div className="alert alert-error shadow-lg px-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{errorMessage}</span>
            </div>
          </div>}

          {isSuccess && <div className="alert alert-success shadow-lg px-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Post create successfully</span>
            </div>
          </div>}
        </div>
      </div>

      
      
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className={`modal ${isModalOpen && 'modal-open'}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Save and publish post?</h3>
          <p className="py-4">You cannot make any more changes and this action is irreversible</p>
          <div className="modal-action">
            <button className="btn btn-ghost normal-case gap-2" onClick={()=>setIsModalOpen(false)}>Go Back</button>
            <button 
              className="btn btn-primary bg-primary-main border-primary-border hover:bg-primary-pressed hover:border-primary-pressed normal-case gap-2" 
              onClick={(e)=>{
                setIsModalOpen(false)
                onSubmit(e, CommunityPostStatus.PUBLISHED, false)
              }}
            >
              <PaperAirplaneIcon className="w-4"/> Save & Publish Post
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
