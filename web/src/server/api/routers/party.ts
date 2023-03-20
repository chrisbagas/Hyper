import { createTRPCRouter, publicProcedure} from "../trpc";
import z from "zod";
import { PartyType, PartyVisibility } from "@prisma/client";
import { PartyService } from "../services/PartyService";


export const partyRouter = createTRPCRouter({
    getByGame: publicProcedure
      .input(z.object({
          id: z.string()
      }))
      .query(async ({ ctx, input }) => {
          return PartyService.getParties(ctx.prisma, input.id);
    }),
  
    createParty: publicProcedure
      .input(z.object({
        gameId: z.string(),
        partyTitle: z.string(),
        partyType: z.nativeEnum(PartyType),
        partyVisibility: z.nativeEnum(PartyVisibility)
      }))
      .mutation(async ({ ctx, input }) => {
        return PartyService.createParty(ctx.prisma, input);
    }),

    joinParty: publicProcedure
      .input(z.object({
        userId: z.string(),
        partyId: z.string(),
        gameId: z.string()
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          return PartyService.joinParty(ctx.prisma, input)
        }
        catch (e: any) {
          return {
            code: 400,
            message: e.message
          }
        }
    }),

    leaveParty: publicProcedure
      .input(z.object({
        userId: z.string(),
        partyId: z.string()
      }))
      .mutation(async ({ ctx, input }) => {
        return PartyService.leaveParty(ctx.prisma, input)
    }),
})