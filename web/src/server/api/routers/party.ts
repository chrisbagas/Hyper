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
        const parties = PartyService.getParties(ctx.prisma, input.id)
        return parties
    }),
  
    createParty: publicProcedure
      .input(z.object({
        gameId: z.string(),
        partyTitle: z.string(),
        partyType: z.nativeEnum(PartyType),
        partyVisibility: z.nativeEnum(PartyVisibility)
        ,
      }))
      .mutation(async ({ ctx, input }) => {
        const party = PartyService.createParty(ctx.prisma, input)
        return party;
      }),
})