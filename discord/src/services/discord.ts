import { ChannelType, Collection, PermissionsBitField, VoiceChannel } from "discord.js";
import discordBotClient from "../engines/discord/discordBotClient";
import { CreateChannelPayload, CreateChannelResult } from "../types/discord";

interface ChannelObject {
  id: string
  interval: NodeJS.Timer
}

const CHANNEL_CHECK_INTERVAL = 60 * 15 * 1000

export default class DiscordService {
  static channels: ChannelObject[] = []

  public static async getChannelById(id: string) {
    const guild = await discordBotClient.guilds.fetch(process.env.DISCORD_GUILD_ID ?? "")
    return guild.channels.fetch(id)
  }

  static async createChannel(payload: CreateChannelPayload): Promise<CreateChannelResult> {
    const guild = await discordBotClient.guilds.fetch(process.env.DISCORD_GUILD_ID ?? "")
    const channel = await guild.channels.create({
      name: payload.name,
      type: ChannelType.GuildVoice,
      parent: process.env.DISCORD_CATEGORY_ID ?? null,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.Connect,
          ]
        },
        ...payload.authorizedUserIds.map((id) => ({
          id: id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.Connect,
          ]
        }))
      ],
    });


    const channelInvite = await channel?.createInvite()

    const channelObject = {
      id: channel.id,
      interval: setInterval(() => this.checkChannel(channel.id), CHANNEL_CHECK_INTERVAL)
    }
    DiscordService.channels.push(channelObject)

    return {
      id: channel?.id,
      guildId: guild?.id,
      name: channel?.name,
      userLimit: channel?.userLimit,
      inviteLink: channelInvite?.url,
    }
  }

  public static async addUserToChannel(channelId: string, userId: string) {
    const channel = await DiscordService.getChannelById(channelId) as VoiceChannel

    if (!channel) return
    await channel.permissionOverwrites.edit(userId, {
      ViewChannel: true,
      Connect: true,
    })
  }

  public static async removeUserFromChannel(channelId: string, userId: string) {
    const channel = await DiscordService.getChannelById(channelId) as VoiceChannel

    if (!channel) return
    await channel.permissionOverwrites.delete(userId)
  }

  public static removeChannel(id: string) {
    const channelObject = DiscordService.channels.splice(
      DiscordService.channels.findIndex((item) => item.id === id),
      1
    )

    if (!channelObject.length) return

    clearInterval(channelObject[0].interval)
  }

  private static async checkChannel(id: string) {
    const channel = await DiscordService.getChannelById(id)

    if (!channel) return

    const fetchedChannel = await channel.fetch(true)
    const members = fetchedChannel.members as Collection<string, any>

    if (members.size == 0) {
      channel.delete()
      DiscordService.removeChannel(channel.id)
    }
  }
}

