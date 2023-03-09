import { gameRouter } from "./routers/game";
import guideRouter from "./routers/guideRouter";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  games: gameRouter,
  users: userRouter,
  guides: guideRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
