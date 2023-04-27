import { type NextPage } from "next";
import { api } from "../../utils/api";
import { NewspaperIcon, TrashIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { CommunityPostStatus } from "@prisma/client";
import { ConfirmationModal } from "../../components/shared/ConfirmationModal";
import { useState, useEffect } from "react";
import { jwtHelper } from "../../components/jwtHelper";
import { useRouter } from "next/router";
import NavWrapperAdmin from "../../components/shared/Navbar/NavbarAdmin";


const Dashboard: NextPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isTakeDown, setIsTakeDown] = useState(false)
    const [idPost, setId] = useState("")
    const { data, refetch } = api.guides.getAll.useQuery()
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
                <div className="p-16">
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
                                    return (
                                        <tr key={guide?.id} className="text-base-5">
                                            <th className="bg-base-3">{index + 1}</th>
                                            <td className="bg-base-3 overflow-hidden">{guide.title}</td>
                                            <td className="bg-base-3">{guide.type}</td>
                                            <td className="bg-base-3">{guide.status}</td>
                                            <td className="bg-base-3">{guide.game.name}</td>
                                            <td className="bg-base-3">{guide.author.username}</td>
                                            <td className="bg-base-3">{guide.createdAt.toLocaleString()}</td>
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
            </NavWrapperAdmin>
        </>
    );
};

export default Dashboard;
