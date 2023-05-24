import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, type NextPage } from "next"
import Head from "next/head"
import { api } from "../../../../utils/api"
import { useRouter } from 'next/router'
import React, { useState } from "react"
import { CommunityPostStatus } from "@prisma/client"
import { GuideForm, Post } from "../../../../components/Guide/GuideForm"
import ErrorPage from 'next/error'
import { GameDashboardNav } from "../../../../components/shared/GameDashboard/GameDashboardNav"
import { ssgPrefetchGuidesContent } from "../../../../utils/ssgPrefetch"

export const getServerSideProps: GetServerSideProps = ssgPrefetchGuidesContent

const EditGuides: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const gameId = props.gameId
  const postId = props.postId
  const { data: game } = api.games.getById.useQuery({ id: gameId as string })
  const postMutation = api.guides.updatePostById.useMutation()
  const [post, setPost] = useState({
    type: undefined,
    title: '',
    content: '',
    headerType: undefined,
    headerUrl: '',
    tagId: undefined
  } as Post)
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isLoading, isError, error } = api.guides.getPostById.useQuery(
    { id: postId as string },
    {
      onSuccess: (data) => {
        setPost({
          type: data.type,
          title: data.title as string,
          content: data.content as string,
          headerType: data.header?.type,
          headerUrl: data.header?.url as string,
          tagId: post.tagId as string,
        })
        if (data.status === CommunityPostStatus.PUBLISHED) {
          setIsPublished(true)
        }
      }
    })
  const [isPublished, setIsPublished] = useState(false)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (isPublished) {
    return <ErrorPage statusCode={404} />
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setErrorMessage('')
    const value = event.target.value
    console.log(value)
    setPost({
      ...post,
      [event.target.id]: value,
    })
  }

  const savePost = async (event: React.SyntheticEvent, status: CommunityPostStatus, isPreview: boolean) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)
    if (!post.type || !post.title || !post.content || !post.headerType || !post.headerUrl) {
      setErrorMessage('Please fill in all fields')
      setIsSubmitting(false)
      return
    }

    try {
      const result = await postMutation.mutateAsync({
        id: postId as string,
        type: post.type,
        status: status,
        title: post.title,
        content: post.content,
        headerType: post.headerType,
        headerUrl: post.headerUrl,
        gameId: gameId as string,
      })

      console.log(result)

      setSuccess(true)
      let redirectTo = `/${gameId}/your-guides`
      if (isPreview) {
        redirectTo = `/${gameId}/your-guides/${postId}`
      }
      setTimeout(() => {
        router.push(redirectTo)
      }, 1000)
    } catch (error) {
      setErrorMessage('Something went wrong! Please try again later')
      setIsSubmitting(false)
      postMutation.reset()
    }
  }

  return (
    <>
      <Head>
        <title>Hyper - Edit Guide</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameDashboardNav id={game?.id ?? ''} logoUrl={game?.logoUrl} name={game?.name} page={router.pathname} />
      <GuideForm
        postData={post}
        setPostData={setPost}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        isSuccess={success}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        onChange={handleChange}
        onSubmit={savePost}
        gameId={gameId as string}
        postId={postId as string}
      />
    </>
  )
}

export default EditGuides
