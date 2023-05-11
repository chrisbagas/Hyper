import { GetServerSideProps, GetServerSidePropsContext } from "next"
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

