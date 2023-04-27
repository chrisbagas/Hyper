import { CommunityPostStatus, ContentType } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head"
import { GuideContent } from "../../../../components/Guide/GuideContent"
import { GuideTopButtonGroup } from "../../../../components/Guide/GuideTopButtonGroup"
import { PaperAirplaneIcon, PencilSquareIcon, ShareIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router";
import { api } from "../../../../utils/api";
import React, { useState } from "react";
import { GameDashboardNav } from "../../../../components/shared/GameDashboard/GameDashboardNav";
import { GuideConfirmationModal } from "../../../../components/Guide/GuideConfirmationModal";
import { ssgPrefetchGuidesContent } from "../../../../utils/ssgPrefetch";

export const getServerSideProps: GetServerSideProps = ssgPrefetchGuidesContent

const ShowMyGuides: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const gameId = props.gameId
  const postId = props.postId
  const postMutation = api.guides.updatePostById.useMutation()
  const { data: game } = api.games.getById.useQuery({ id: gameId as string })
  const { data, isError, isLoading, error } = api.guides.getPostById.useQuery({ id: postId as string })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const publishPost = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      await postMutation.mutateAsync({
        id: postId as string,
        type: data.type,
        status: CommunityPostStatus.PUBLISHED,
        title: data.title,
        content: data.content as string,
        headerType: data.header?.type as ContentType,
        headerUrl: data.header?.url as string,
        gameId: gameId as string,
      })

      setIsSuccess(true)

      setTimeout(() => {
        router.reload()
      }, 1000)
    } catch (e) {
      setErrorMessage('Something went wrong! Please try again later')
      setIsSubmitting(false)
      postMutation.reset()
    }
  }

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pt-16 px-16">
        <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
      </div>

      {data.status === CommunityPostStatus.DRAFT && <GuideTopButtonGroup returnUrl={`/${gameId}/your-guides`} className="px-16 pb-6">
        <div className="flex justify-between gap-2">
          <button className={`flex btn btn-ghost normal-case gap-2 text-neutral-0 ${isSubmitting && 'btn-disabled'}`} onClick={() => router.push(`/${gameId}/your-guides/${postId}/edit`)}><PencilSquareIcon className="w-4" /> Edit Post</button>
          <button className={`flex btn btn-primary bg-primary-main border-primary-border hover:bg-primary-pressed hover:border-primary-pressed normal-case gap-2 ${isSubmitting && 'btn-disabled'}`} onClick={() => setIsModalOpen(true)}><PaperAirplaneIcon className="w-4" /> Publish Post</button>
        </div>
      </GuideTopButtonGroup>}

      {data.status === CommunityPostStatus.PUBLISHED && <GuideTopButtonGroup returnUrl={`/${gameId}/your-guides`} className="px-16 pb-6">
        <button
          className="flex btn btn-ghost normal-case gap-2 text-neutral-0"
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.host}/${gameId}/guides/${postId}`)
            setIsTooltipOpen(true)
            setTimeout(() => {
              setIsTooltipOpen(false)
            }, 2000)
          }
          }>
          Share This Post <ShareIcon className="w-4" />
        </button>
      </GuideTopButtonGroup>}

      <GuideContent
        type={data?.type}
        title={data?.title}
        content={data?.content as string}
        headerType={data?.header?.type as ContentType}
        headerUrl={data?.header?.url as string}
        author={data?.authorName as string}
        authorId={data?.authorId as string}
        postedAt={data?.updatedAt}
      />

      <div className="toast px-16">
        {isTooltipOpen && <div className="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Copied to clipboard.</span>
          </div>
        </div>}

        {errorMessage && <div className="alert alert-error shadow-lg px-8">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorMessage}</span>
          </div>
        </div>}

        {isSuccess && <div className="alert alert-success shadow-lg px-8">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Post published successfully</span>
          </div>
        </div>}
      </div>

      <GuideConfirmationModal
        headerText="Publish this post?"
        contentText="You cannot make any more changes and this action is irreversible"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <button
          className="btn btn-primary bg-primary-main border-primary-border hover:bg-primary-pressed hover:border-primary-pressed normal-case gap-2"
          onClick={(e) => {
            setIsModalOpen(false)
            publishPost(e)
          }}
        >
          <PaperAirplaneIcon className="w-4" /> Publish Post
        </button>
      </GuideConfirmationModal>
    </>
  )
}

export default ShowMyGuides
