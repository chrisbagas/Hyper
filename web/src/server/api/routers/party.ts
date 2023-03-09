import { createTRPCRouter, publicProcedure} from "../trpc";
import z from "zod";
import { PartyType, PartyVisibility } from "@prisma/client";


export const partyRouter = createTRPCRouter({
    getByGame: publicProcedure
    .input(z.object({
        id: z.string()
    }))
    .query(async ({ ctx, input }) => {
        return []
    }),
  
    createParty: publicProcedure
      .input(z.object({
        gameId: z.string(),
        partyTitle: z.string(),
        partyType: z.nativeEnum(PartyType),
        partyVisibility: z.nativeEnum(PartyVisibility)
        ,
      }))
      .mutation(async ({ input }) => {
        return [];
      }),
})