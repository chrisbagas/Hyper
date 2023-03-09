import { createTRPCRouter, publicProcedure} from "../trpc";
import z from "zod";
import { PartyService } from "../services/PartyService";
import { contextProps } from "@trpc/react-query/shared";
import { PartyType, PartyVisibility } from "@prisma/client";


export const partyRouter = createTRPCRouter({
    getByGame: publicProcedure
    .input(z.object({
        id: z.string()
    }))
    .query(async ({ ctx, input }) => {
        // todo: get party using party service
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
        // todo: create party using party service
        return [];
      }),
})