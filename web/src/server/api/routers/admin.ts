import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod"
import { AdminService } from "../services/AdminService";

export const adminRouter = createTRPCRouter({
    login: protectedProcedure
    .input(z.object({
      usernameInput: z.string(),
      passwordInput: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      return AdminService.login(input.usernameInput, input.passwordInput, ctx.prisma)
    })
})
