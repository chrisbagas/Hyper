import { UserService } from "../services/UserService";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure
    .query(({ ctx }) => {
      return UserService.getProfile(ctx.session.user.id, ctx.prisma)
    })
})
