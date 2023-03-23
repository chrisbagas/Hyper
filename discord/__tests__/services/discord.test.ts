import { describe, expect, it, vi } from "vitest"

import client from "../__mocks__/bot"
import guild from "../__mocks__/guild"
import channel from "../__mocks__/channel"

import DiscordService from "../../src/services/discord"

vi.resetModules()
vi.mock("~/engines/discord/discordBotClient", () => {
  return {
    default: client
  }
})

describe("DiscordService createChannel method", () => {
  it("should call fetch discord guild", async () => {
    // @ts-ignore
    client.guilds.fetch.mockResolvedValue(guild);
    // @ts-ignore
    guild.channels.create.mockResolvedValue(channel);

    await DiscordService.createChannel({
      name: "test",
      authorizedUserIds: ["test-1"]
    })

    expect(client.guilds.fetch).toHaveBeenCalledOnce()
  })

  it("should create a discord channel", async () => {
    // @ts-ignore
    client.guilds.fetch.mockResolvedValue(guild);
    // @ts-ignore
    guild.channels.create.mockResolvedValue(channel);


    await DiscordService.createChannel({
      name: "test",
      authorizedUserIds: ["test-1"]
    })

    expect(guild.channels.create).toHaveBeenCalledOnce()
  })

  it("should create a discord invite link", async () => {
    // @ts-ignore
    client.guilds.fetch.mockResolvedValue(guild);
    // @ts-ignore
    guild.channels.create.mockResolvedValue(channel);

    await DiscordService.createChannel({
      name: "test",
      authorizedUserIds: ["test-1"]
    })

    expect(channel?.createInvite).toHaveBeenCalledOnce()
  })

  it("should return channel data", async () => {
    // @ts-ignore
    client.guilds.fetch.mockResolvedValue(guild);
    // @ts-ignore
    guild.channels.create.mockResolvedValue(channel);

    guild.id = "test"
    channel.id = "test"
    // @ts-ignore
    channel.name = "test"
    // @ts-ignore
    channel.userLimit = 5
    // @ts-ignore
    channel.createInvite.mockResolvedValue({
      url: "test"
    })

    const data = await DiscordService.createChannel({
      name: "test",
      authorizedUserIds: ["test-1"]
    })

    expect(data).toStrictEqual({
      id: "test",
      guildId: "test",
      name: "test",
      userLimit: 5,
      inviteLink: "test",
    })

  })
})
