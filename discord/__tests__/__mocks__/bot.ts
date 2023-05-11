import { Client } from "discord.js";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

beforeEach(() => {
  mockReset(client)
})

const client = mockDeep<Client>()
export default client;
