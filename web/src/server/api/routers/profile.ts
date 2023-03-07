import { createTRPCRouter, publicProcedure } from '../trpc';
import z from "zod";
import { ProfileService } from '../services/ProfileService';

const profileRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      return ProfileService.getProfile(input.id, ctx.prisma)
    })
});

export default profileRouter;