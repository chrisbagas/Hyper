import { createTRPCRouter, publicProcedure } from "../trpc";
import { GameService } from "../services/GameService";
import { z } from "zod";

export const gameRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      const games = await GameService.getAllGames(ctx.prisma)
      return games
    }),
  getById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const game = await GameService.getById(input, ctx.prisma)
      return game
    })
})