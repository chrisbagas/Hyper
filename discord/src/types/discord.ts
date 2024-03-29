import { z } from "zod"

export interface CreateChannelPayload {
  name: string
  authorizedUserIds: string[]
}

export interface CreateChannelResult {
  guildId?: string
  id?: string
  name?: string
  userLimit?: number
  inviteLink?: string
}

export interface AddRemoveUserPermissionPayload {
  channelId: string
  userId: string
}

export const createChannelSchema = z.object({
  name: z.string(),
  authorizedUserIds: z.array(
    z.string()
  ).min(1)
})

export const addRemoveUserPermissionSchema = z.object({
  channelId: z.string(),
  userId: z.string(),
})

