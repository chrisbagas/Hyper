import { Guild } from "discord.js";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

beforeEach(() => {
  mockReset(guild)
})

const guild = mockDeep<Guild>()
export default guild;
