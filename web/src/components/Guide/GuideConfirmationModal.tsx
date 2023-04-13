import React from "react"
import { ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/solid"

export interface GuideConfirmationModalProps {
  children: React.ReactNode
  headerText: string
  contentText: string
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const GuideConfirmationModal: React.FC<GuideConfirmationModalProps> = ({ children, headerText, contentText, isModalOpen, setIsModalOpen }) => {
  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className={`modal ${isModalOpen && 'modal-open'}`}>
        <div className="modal-box bg-base-2 w-5/12 max-w-2xl rounded-lg">
          <div className="flex justify-between">
            <div className="flex flex-row gap-x-3.5">
              <ExclamationTriangleIcon className="w-5 text-warning-main"/>
              <h3 className="font-bold text-lg text-neutral-0">{headerText}</h3>
            </div>
            <XCircleIcon className="w-5 text-base-4 cursor-pointer" onClick={()=>setIsModalOpen(false)}/>
          </div>

          <p className="py-2 pl-9 text-base-5">{contentText}</p>
          <div className="modal-action">
            <button className="btn btn-ghost normal-case gap-2 text-neutral-0" onClick={()=>setIsModalOpen(false)}>Go Back</button>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
