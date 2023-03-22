import { DiscordService } from "../services/DiscordService";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const discordRouter = createTRPCRouter({
  getUserDetails: protectedProcedure
    .query(({ ctx }) => {
      return DiscordService.getUserDetails(ctx.session.user.id, ctx.prisma)
    }),
  getUserConnections: protectedProcedure
    .query(({ ctx }) => {
      return DiscordService.getUserConnections(ctx.session.user.id, ctx.prisma)
    })
})
