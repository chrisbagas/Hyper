import { discordRouter } from "./routers/discord";
import { gameRouter } from "./routers/game";
import { guideRouter } from "./routers/guide";
import { userRouter } from "./routers/user";
import profileRouter from "./routers/profileRouter";
import { createTRPCRouter } from "./trpc";
import { partyRouter } from "./routers/party"
import { adminRouter } from "./routers/admin";
import { tagRouter } from "./routers/tag";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  games: gameRouter,
  party: partyRouter,
  profiles: profileRouter,
  users: userRouter,
  guides: guideRouter,
  discord: discordRouter,
  tag: tagRouter,
  admin: adminRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
