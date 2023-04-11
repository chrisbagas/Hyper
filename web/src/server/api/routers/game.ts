import { createTRPCRouter, publicProcedure } from "../trpc";
import { GameService } from "../services/GameService";
import { z } from "zod";

export const gameRouter = createTRPCRouter({

  getAll: publicProcedure
    .query(async ({ ctx }) => {
<<<<<<< HEAD
        return GameService.getAllGames(ctx.prisma)
=======
      return GameService.getAllGames(ctx.prisma)
>>>>>>> f4c79f8820089eda8abc25daaf0806395bf170bd
    }),

  getById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ ctx, input }) => {
<<<<<<< HEAD
        return GameService.getById(input, ctx.prisma)
=======
      return GameService.getById(input.id, ctx.prisma)
>>>>>>> f4c79f8820089eda8abc25daaf0806395bf170bd
    })
})