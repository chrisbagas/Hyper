import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import z from "zod";
import { ProfileService } from '../services/ProfileService';

const profileRouter = createTRPCRouter({
  getProfile: protectedProcedure
  .input(z.object({
    userId: z.string().optional()
  }))
  .query(({ ctx , input}) => {
    return ProfileService.getProfile(input.userId || ctx.session.user.id, ctx.prisma)
  }),

  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().optional(),
      bio: z.string().optional(),
      countryCode: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ProfileService.updateProfile(ctx.session.user.id, input, ctx.prisma);
    }),

    getAllCountry: publicProcedure
    .query(({ctx})=>{
      return ProfileService.getAllCountries(ctx.prisma)
    }),

  getConnectionAccount: protectedProcedure
    .input(z.object({
      userId: z.string().optional()
    }))
    .query(async ({ ctx, input  }) => {
       
      return ProfileService.getConnectionAccount(input.userId || ctx.session.user.id, ctx.prisma)
    }),
  
});

export default profileRouter;