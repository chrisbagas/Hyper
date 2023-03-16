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
  getAllbyUser: publicProcedure
    .input(z.object({
      gameId: z.string(),
      userId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      return GuideService.getAllbyUser(input.gameId, input.userId, ctx.prisma)
    }),
});

export default guideRouter;
