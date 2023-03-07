import { gameRouter } from "./routers/game";
import { createTRPCRouter } from "./trpc";
import { partyRouter } from "./routers/party"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  games: gameRouter,
  party: partyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
