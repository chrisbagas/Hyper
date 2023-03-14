import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import z from "zod";
import { ProfileService } from '../services/ProfileService';

const profileRouter = createTRPCRouter({
  getProfile: protectedProcedure
  .query(({ ctx }) => {
    return ProfileService.getProfile(ctx.session.user.id, ctx.prisma)
  }),

  updateProfile: protectedProcedure
    .input(z.object({
      username: z.string().optional(),
      bio: z.string().optional(),
      countryCode: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ProfileService.updateProfile(ctx.session.user.id, input, ctx.prisma);
    }),

    getConnectionAccount: protectedProcedure
    .query(async ({ ctx }) => {
      const res = await ProfileService.getConnectionAccount()
      return res
    }),
  
});

export default profileRouter;