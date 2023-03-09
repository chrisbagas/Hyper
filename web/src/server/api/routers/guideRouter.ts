import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";
import { GuideService } from "../services/GuideService";


const guideRouter = createTRPCRouter({
  getAllbyGame: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      return GuideService.getAllbyGame(input.id, ctx.prisma)
    }),
});

export default guideRouter;
