import { createTRPCRouter, publicProcedure} from "../trpc";
import z from "zod";
import { PartyService } from "../services/PartyService";
import { contextProps } from "@trpc/react-query/shared";

export const partyRouter = createTRPCRouter({
    getByGame: publicProcedure
    .input(z.object({
        id: z.string()
    }))
    .query(async ({ ctx, input }) => {
        return []
    })
})