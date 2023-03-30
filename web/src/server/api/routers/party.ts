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
        userId: z.string(),
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
        return PartyService.joinParty(ctx.prisma, input)
    }),

    leaveParty: publicProcedure
      .input(z.object({
        userId: z.string(),
        partyId: z.string()
      }))
      .mutation(async ({ ctx, input }) => {
        return PartyService.leaveParty(ctx.prisma, input)
    }),

    updateParty: publicProcedure
      .input(z.object({
        partyId: z.string(),
        userId: z.string(),
        partyTitle: z.string(),
        partyType: z.nativeEnum(PartyType),
        partyVisibility: z.nativeEnum(PartyVisibility)
      }))
      .mutation(async ({ ctx, input }) => {
        return PartyService.updateParty(ctx.prisma, input)
    }),
})