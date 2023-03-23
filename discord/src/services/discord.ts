import { ChannelType, Client, Guild, PermissionsBitField } from "discord.js";
import discordBotClient from "../engines/discord/discordBotClient";
import { CreateChannelPayload, CreateChannelResult } from "../types/discord";

export default class DiscordService {
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

    return {
      id: channel?.id,
      guildId: guild?.id,
      name: channel?.name,
      userLimit: channel?.userLimit,
      inviteLink: channelInvite?.url,
    }
  }
}

