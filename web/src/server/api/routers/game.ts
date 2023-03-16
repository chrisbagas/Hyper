import { createTRPCRouter, publicProcedure } from "../trpc";
import { GameService } from "../services/GameService";
import { z } from "zod";

export const gameRouter = createTRPCRouter({
  
  getAll: publicProcedure
    .query(async ({ ctx }) => {
        return await GameService.getAllGames(ctx.prisma)
    }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
        return await GameService.getById(input, ctx.prisma)
    })
})