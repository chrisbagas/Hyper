import { Channel } from "discord.js";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

beforeEach(() => {
  mockReset(channel)
})

const channel = mockDeep<Channel>()
export default channel;
