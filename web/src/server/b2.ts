import B2 from "backblaze-b2";
import memoize from "memoizee";

import { env } from "../env.mjs"

const b2 = new B2({
  applicationKeyId: env.APPLICATION_KEY_ID ?? "",
  applicationKey: env.APPLICATION_KEY ?? "",
})

export const reauthenticate = memoize(
  () => b2.authorize(),
  { promise: true, maxAge: 1000 * 60 * 10 },
)

const globalForB2 = globalThis as unknown as { b2: B2 }

export const b2Client = globalForB2.b2 || b2
if (env.NODE_ENV !== "production") globalForB2.b2 = b2;

