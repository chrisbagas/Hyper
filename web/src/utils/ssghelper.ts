import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../server/api/root";
import { createInnerTRPCContext } from "../server/api/trpc";
import superjson from "superjson";

export const createSSG = () => {
  return createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({
      session: null,
    }),
    transformer: superjson,
  })
}
