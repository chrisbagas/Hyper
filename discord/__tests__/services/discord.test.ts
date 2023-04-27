import { describe, expect, it, vi } from "vitest"

import client from "../__mocks__/bot"
import guild from "../__mocks__/guild"
import channel from "../__mocks__/channel"

import DiscordService from "../../src/services/discord"
import { Collection } from "discord.js"

vi.resetModules()
vi.mock("~/engines/discord/discordBotClient", () => {
  return {
    default: client
  }
})

describe("DiscordService getChannelById method", () => {
  it("Should return discord channel", async () => {
    client.guilds.fetch.mockResolvedValue(guild)
    guild.channels.fetch.mockResolvedValue(channel)

    expect(await DiscordService.getChannelById("TEST_ID")).toBe(channel)
  })
})

describe("DiscordService checkChannel method", () => {
  it("should return not fetch channel when channel does not exist", async () => {
    client.guilds.fetch.mockResolvedValue(guild)
    guild.channels.fetch.mockResolvedValue(null)

    await DiscordService.checkChannel("test")
    expect(channel.fetch).not.toHaveBeenCalled()
  })

  it("should call removeChannel when channel is empty", async () => {
    const originalRemoveChannel = DiscordService.removeChannel
    DiscordService.removeChannel = vi.fn()

    client.guilds.fetch.mockResolvedValue(guild)
    guild.channels.fetch.mockResolvedValue(channel)

    channel.fetch.mockResolvedValue({
      members: new Collection<string, any>(),
    })

    await DiscordService.checkChannel("test")
    expect(DiscordService.removeChannel).toHaveBeenCalled()
    expect(channel.delete).toHaveBeenCalled()

    DiscordService.removeChannel = originalRemoveChannel
  })
})

describe("DiscordService removeChannel method", () => {
  it("should not call clearInterval if channel does not exist", () => {
    DiscordService.channels = []
    const mockClearInterval = vi.fn()
    global.clearInterval = mockClearInterval

    DiscordService.removeChannel("abcdefg")

    expect(mockClearInterval).not.toHaveBeenCalled()
  })

  it("should call clearInterval if channel exists", () => {
    DiscordService.channels = [
      {
        id: "abcdefg",
        interval: null
      }
    ]

    const mockClearInterval = vi.fn()
    global.clearInterval = mockClearInterval

    DiscordService.removeChannel("abcdefg")
    expect(mockClearInterval).toHaveBeenCalled()
  })
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

describe("DiscordService addUserToChannel method", () => {
  it("should call fetch DiscordService getChannelById", async () => {
    const tempGetChannelById = DiscordService.getChannelById
    const mockGetChannelById = vi.fn()
    DiscordService.getChannelById = mockGetChannelById

    // @ts-ignore
    DiscordService.getChannelById.mockResolvedValue(channel);

    await DiscordService.addUserToChannel("TEST-CHANNEL", "TEST-USER")


    DiscordService.getChannelById = tempGetChannelById
    expect(mockGetChannelById).toHaveBeenCalledOnce()
  })

  it("should not throw error when channel does not exist", async () => {
    const tempGetChannelById = DiscordService.getChannelById
    const mockGetChannelById = vi.fn()
    DiscordService.getChannelById = mockGetChannelById

    // @ts-ignore
    DiscordService.getChannelById.mockResolvedValue(null);

    await DiscordService.addUserToChannel("TEST-CHANNEL", "TEST-USER")

    DiscordService.getChannelById = tempGetChannelById
    expect(mockGetChannelById).toHaveBeenCalledOnce()
  })
})


describe("DiscordService removeUserFromChannel method", () => {
  it("should call fetch DiscordService getChannelById", async () => {
    const tempGetChannelById = DiscordService.getChannelById
    const mockGetChannelById = vi.fn()
    DiscordService.getChannelById = mockGetChannelById

    // @ts-ignore
    DiscordService.getChannelById.mockResolvedValue(channel);

    await DiscordService.removeUserFromChannel("TEST-CHANNEL", "TEST-USER")


    DiscordService.getChannelById = tempGetChannelById
    expect(mockGetChannelById).toHaveBeenCalledOnce()
  })


  it("should not throw error when channel does not exist", async () => {
    const tempGetChannelById = DiscordService.getChannelById
    const mockGetChannelById = vi.fn()
    DiscordService.getChannelById = mockGetChannelById

    // @ts-ignore
    DiscordService.getChannelById.mockResolvedValue(null);

    await DiscordService.removeUserFromChannel("TEST-CHANNEL", "TEST-USER")

    DiscordService.getChannelById = tempGetChannelById
    expect(mockGetChannelById).toHaveBeenCalledOnce()
  })
})
