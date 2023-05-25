import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"
import { createSSG } from "./ssghelper"

export const ssgPrefetchGuidesContent: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const ssg = createSSG()
  const gameId = ctx.params?.game as string
  const postId = ctx.params?.guides as string

  try {
    await Promise.all([ssg.games.getById.fetch({ id: gameId }), ssg.guides.getPostById.fetch({ id: postId })])
  } catch (e) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      trpcState: ssg.dehydrate(),
      gameId: gameId,
      postId: postId,
    },
  }
}

export const ssgPrefetchPrivateGuidesContent: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const ssg = createSSG()
  const gameId = ctx.params?.game as string
  const postId = ctx.params?.guides as string

  try {
    const result = await Promise.all([ssg.games.getById.fetch({ id: gameId }), ssg.guides.getPostById.fetch({ id: postId })])
    const post = result[1]
    const session = await getSession(ctx)
    if (post.authorId !== session?.user.id){
      return {
        notFound: true,
      }
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      trpcState: ssg.dehydrate(),
      gameId: gameId,
      postId: postId,
    },
  }
}
