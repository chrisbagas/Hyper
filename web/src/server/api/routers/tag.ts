import { createTRPCRouter, publicProcedure } from "../trpc";
import { TagService } from "../services/TagService";

export const tagRouter = createTRPCRouter({

  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return TagService.getAllTags(ctx.prisma)
    }),

})