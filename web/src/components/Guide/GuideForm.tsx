import { CommunityPostStatus, CommunityPostType, ContentType, CommunityTag } from "@prisma/client"
import React, { useState } from "react"
import { api } from "../../utils/api";
import { ExclamationTriangleIcon, LinkIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { GuideTopButtonGroup } from "./GuideTopButtonGroup"
import { EyeIcon, FolderPlusIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { GuideConfirmationModal } from "./GuideConfirmationModal"

export interface Post {
  type:CommunityPostType|undefined,
  title:string,
  content:string,
  headerType:ContentType|undefined,
  headerUrl:string,
  tagId: string,
}

export interface GuideFormProps {
  postData:Post,
  errorMessage:string,
  isSuccess:boolean,
  isSubmitting:boolean,
  onChange:(event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>void,
  onSubmit:(event: React.SyntheticEvent, status: CommunityPostStatus, isPreview: boolean)=>Promise<void>,
  gameId:string,
  postId?:string,
}

export const GuideForm: React.FC<GuideFormProps> = ({ postData, errorMessage, isSuccess, isSubmitting, onChange, onSubmit, gameId, postId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const tags = api.tag.getAll.useQuery()

  return (
    <>
      <div className="flex flex-col gap-6 pb-16">
        
        <GuideTopButtonGroup className="px-16" returnUrl={postId ? `/${gameId}/your-guides/${postId}` : `/${gameId}/your-guides`}>
          <div className="flex justify-between gap-2">
            <button className={`flex btn btn-ghost normal-case gap-2 text-neutral-0 ${isSubmitting && 'btn-disabled'}`} onClick={(e)=>onSubmit(e, CommunityPostStatus.DRAFT, false)}><FolderPlusIcon className="w-4"/> Save as Draft</button>
            <button className={`flex btn btn-ghost normal-case gap-2 text-neutral-0 ${isSubmitting && 'btn-disabled'}`} onClick={(e)=>onSubmit(e, CommunityPostStatus.DRAFT, true)}><EyeIcon className="w-4"/> Save & Preview</button>
            <button className={`flex btn btn-primary bg-primary-main border-primary-border hover:bg-primary-pressed hover:border-primary-pressed normal-case gap-2 ${isSubmitting && 'btn-disabled'}`} onClick={()=>setIsModalOpen(true)}><PaperAirplaneIcon className="w-4"/> Save & Publish Post</button>
          </div>
        </GuideTopButtonGroup>

        <div className="form-control w-full px-16">
          <label className="label">
            <span className="label-text text-neutral-0">Post Title</span>
          </label>
          <input 
            type="text" 
            id="title"
            placeholder="How to Win a match" 
            className="input input-bordered w-full bg-base-2 border-base-3 placeholder:text-base-4 text-neutral-0" 
            value={postData.title} 
            onChange={onChange}
          />
        </div>

        <div className="flex justify-between px-16 gap-6">
          <div className="form-control w-1/4">
            <label className="label">
              <span className="label-text text-neutral-0">Header Attachment Type</span>
            </label>
            <select id="headerType" className={`select w-full bg-base-2 border-base-3 ${postData.headerType === undefined ? "text-base-4" : "text-neutral-0"}`} value={postData.headerType} onChange={onChange}>
              <option disabled selected value={undefined}>Select header type</option>
              <option value={ContentType.IMAGE}>Image</option>
              <option value={ContentType.VIDEO}>Video</option>
            </select>
            <label className="label">
              <span className="label-text-alt text-base-5">Please select the attachment type</span>
            </label>
          </div>

          <div className="form-control w-3/4">
            <label className="label">
              <span className="label-text text-neutral-0">Header Attachment Link</span>
            </label>
            <label className="input-group">
              <span className="bg-base-1"><LinkIcon className="w-4 text-base-4"/></span>
              <input 
                type="text" 
                id="headerUrl"
                placeholder="www.medal.tv/001ojiad0983q09" 
                className="input input-bordered w-full bg-base-2 border-base-3 placeholder:text-base-4 text-neutral-0" 
                value={postData.headerUrl}
                onChange={onChange}
              />
            </label>
            <label className="label">
              <span className="label-text-alt text-base-5">Only supports link or files provided by selected attachment type</span>
            </label>
          </div>
        </div>

        <div className="form-control w-full px-16">
          <label className="label">
            <span className="label-text text-neutral-0">Select Post Type</span>
          </label>
          <select id="type" className={`select w-full bg-base-2 border-base-3 ${postData.type === undefined ? "text-base-4" : "text-neutral-0"}`} value={postData.type} onChange={onChange}>
            <option disabled selected value={undefined}>Select post type</option>
            <option value={CommunityPostType.CLIP}>Clip</option>
            <option value={CommunityPostType.GUIDE}>Guide</option>
          </select>
        </div>

        <div className="form-control w-full px-16">
          <label className="label">
            <span className="label-text text-neutral-0">Select Post Tags</span>
          </label>
          <select id="tagId" className={`select w-full bg-base-2 border-base-3 ${postData.tagId === undefined ? "text-base-4" : "text-neutral-0"}`} value={postData.tagId} onChange={onChange}>
            <option disabled selected value={undefined}>Select post tag</option>
            {tags?.data?.map(tag => 
              <option key={tag.id} value={tag.id}>{ tag.name }</option>
            )}
          </select>
        </div>

        <div className="form-control w-full px-16">
          <label className="label">
            <span className="label-text text-neutral-0">Post Content</span>
          </label>
          <textarea 
            id="content"
            className="textarea bg-base-2 border-base-3 placeholder:text-base-4 text-neutral-0" 
            placeholder="This post contains a match replay and ..."
            value={postData.content}
            onChange={onChange}
          >
          </textarea>
        </div>
        
        <div className="toast">
          {errorMessage && <div className="alert alert-error shadow-lg px-16">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{errorMessage}</span>
            </div>
          </div>}

          {isSuccess && <div className="alert alert-success shadow-lg px-16">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Post create successfully</span>
            </div>
          </div>}
        </div>
      </div>

      <GuideConfirmationModal
        headerText="Save and publish post?"
        contentText="You cannot make any more changes and this action is irreversible"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <button 
          className="btn btn-primary bg-primary-main border-primary-border hover:bg-primary-pressed hover:border-primary-pressed normal-case gap-2" 
          onClick={(e)=>{
            setIsModalOpen(false)
            onSubmit(e, CommunityPostStatus.PUBLISHED, false)
          }}
        >
          <PaperAirplaneIcon className="w-4"/> Save & Publish Post
        </button>
      </GuideConfirmationModal>
      
      
    </>
  )
}
