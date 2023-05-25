import React from "react";
import { type NextPage } from "next";
import { api } from "../../utils/api";
import { NewspaperIcon, TrashIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { CommunityPostStatus, ContentType } from "@prisma/client";
import { ConfirmationModal } from "../../components/shared/ConfirmationModal";
import { useState, useEffect } from "react";
import { jwtHelper } from "../../components/jwtHelper";
import { useRouter } from "next/router";
import NavWrapperAdmin from "../../components/shared/Navbar/NavbarAdmin";
import { GuideContent } from "../../components/Guide/GuideContent";


const Dashboard: NextPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isTakeDown, setIsTakeDown] = useState(false)
    const [idPost, setId] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const { data, refetch } = api.guides.getAll.useQuery({ page: currentPage, pageSize: 10 })
    const [postId, setPostId] = React.useState("")

    const {
        data: selectedPostData,
        isError: selectedPostIsError,
        error: selectedPostError,
    } = api.guides.getPostById.useQuery({ id: postId as string })

    const postMutation = api.guides.updateStatusModerationById.useMutation()

    const router = useRouter()
    useEffect(() => {
        if (!jwtHelper.jwtCheck()) {
            router.push('/admin')
        }
    }, [])
    function handleClickUp(id: string) {
        setIsTakeDown(false)
        setId(id)
        setIsModalOpen(true)
    }
    function handleClickDown(id: string) {
        setIsTakeDown(true)
        setId(id)
        setIsModalOpen(true)
    }
    async function handleClickPublish(id: string) {
        const res = await postMutation.mutateAsync({ id: id, status: CommunityPostStatus.PUBLISHED })
        refetch()
        console.log(res)
    }
    async function handleClickTakeDown(id: string) {
        const res = await postMutation.mutateAsync({ id: id, status: CommunityPostStatus.TAKENDOWN })
        refetch()
        console.log(res)
    }


    return (
        <>
            <NavWrapperAdmin className="bg-base-0 min-h-screen w-full">
                <div className={postId !== "" && "grid grid-cols-5"}>
                    <div className="p-16 col-span-3 h-screen">
                        <div className="flex items-center content-center my-6">
                            <NewspaperIcon className="h-12 w-12 mr-2" />
                            <h1 className="text-3xl text-white">Community Post Management</h1>
                        </div>
                        <div className="flex justify-center my-2">
                            <table className="table w-full table-fixed">
                                <thead>
                                    <tr className="text-base-5">
                                        <th className="bg-base-2 w-1/12"></th>
                                        <th className="bg-base-2 w-1/4">Post Name</th>
                                        <th className="bg-base-2">Post Type</th>
                                        <th className="bg-base-2">Status</th>
                                        <th className="bg-base-2">Game</th>
                                        <th className="bg-base-2">Uploader</th>
                                        <th className="bg-base-2">Upload Date</th>
                                        <th className="bg-base-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((guide, index) => {
                                        const rowNumber = (currentPage - 1) * 10 + index + 1;
                                        return (
                                            <tr key={guide?.id} className="text-base-5">
                                                <th className="bg-base-3">{rowNumber}</th>
                                                <td
                                                    className="bg-base-3 overflow-hidden underline cursor-pointer"
                                                    onClick={() => {
                                                        setPostId(guide?.id)
                                                    }}
                                                >
                                                    {guide.title}
                                                </td>
                                                <td className="bg-base-3">{guide.type}</td>
                                                <td className="bg-base-3 overflow-hidden">{guide.status}</td>
                                                <td className="bg-base-3">{guide.game.name}</td>
                                                <td className="bg-base-3 overflow-hidden">{guide.author.username}</td>
                                                <td className={postId !== "" ? "bg-base-3 overflow-hidden" : "bg-base-3"}>{guide.createdAt.toLocaleString()}</td>
                                                {guide.status === "TAKENDOWN" ? (
                                                    <td className="bg-base-3 text-success-main text-center align-middle">
                                                        <button onClick={(e) => handleClickUp(guide.id)} className="mx-auto">
                                                            <ArrowUpCircleIcon className="h-6 w-6" />
                                                        </button></td>
                                                ) : (guide.status === "DRAFT" ? (
                                                    <td className="bg-base-3 text-base-4 text-center align-middle"><TrashIcon className="mx-auto h-6 w-6" /></td>
                                                ) : (
                                                    <td className="bg-base-3 text-error-main text-center align-middle"><button onClick={(e) => handleClickDown(guide.id)}><TrashIcon className="mx-auto h-6 w-6" /></button></td>
                                                ))
                                                }
                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </table>
                        </div>
                        <div className="flex justify-center my-2 w-full">
                            {/* Previous page button */}
                            <button
                                className="btn bg-primary-main text-white"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous Page
                            </button>

                            {/* Next page button */}
                            <button
                                className="btn bg-primary-main text-white ml-2"
                                disabled={data?.length !== 10}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next Page
                            </button>
                        </div>
                    </div>
                    {isTakeDown ? (
                        <ConfirmationModal
                            headerText="Take down this post?"
                            contentText="This post will no longer appear and accessible publicly, but you can still revert the status back to published"
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                        >
                            <button
                                className="btn btn-primary bg-error-main border-error-border hover:bg-error-pressed hover:border-error-pressed normal-case gap-2"
                                onClick={(e) => {
                                    setIsModalOpen(false)
                                    handleClickTakeDown(idPost)
                                }}
                            >
                                <TrashIcon className="w-4" /> Take Down
                            </button>
                        </ConfirmationModal>
                    ) : (
                        <ConfirmationModal
                            headerText="Republish this post?"
                            contentText="This post will appear and accessible publicly again"
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                        >
                            <button
                                className="btn btn-primary bg-success-main border-success-border hover:bg-success-pressed hover:border-success-pressed normal-case gap-2"
                                onClick={(e) => {
                                    setIsModalOpen(false)
                                    handleClickPublish(idPost)
                                }}
                            >
                                <ArrowUpCircleIcon className="w-4" /> Republish Post
                            </button>
                        </ConfirmationModal>
                    )
                    }

                    {selectedPostData && (<>
                        <div className="w-full h-screen col-span-2 overflow-y-auto py-16">
                            <div className='my-6'>
                                <div className="flex ">
                                    <button className="btn btn-square btn-outline"
                                        onClick={() => {
                                            setPostId('')
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                    <div className="px-0">
                                        <GuideContent
                                            type={selectedPostData?.type}
                                            title={selectedPostData?.title}
                                            content={selectedPostData?.content as string}
                                            headerType={selectedPostData?.header?.type as ContentType}
                                            headerUrl={selectedPostData?.header?.url as string}
                                            author={selectedPostData?.authorName as string}
                                            authorId={selectedPostData?.authorId as string}
                                            postedAt={selectedPostData?.updatedAt}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </>
                    )}

                </div>
            </NavWrapperAdmin>
        </>
    );
};

export default Dashboard;
