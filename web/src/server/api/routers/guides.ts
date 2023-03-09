import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod"

export const guidesRouter = createTRPCRouter({
  getPostById: publicProcedure
    .input(
      z.object({ 
        id: z.string() 
      })
    )
    .query(({ ctx, input }) => {
      const data = await ctx.prisma.communityPost.findUnique({})
    })
})
