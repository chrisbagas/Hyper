import { createTRPCRouter, publicProcedure } from "../trpc";
import { GameService } from "../services/GameService";
import { z } from "zod";

export const gameRouter = createTRPCRouter({

  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return GameService.getAllGames(ctx.prisma)
    }),

  getById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      return GameService.getById(input.id, ctx.prisma)
    })
})