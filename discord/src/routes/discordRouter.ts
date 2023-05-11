import { Router } from "express";
import { AddRemoveUserPermissionPayload, addRemoveUserPermissionSchema, CreateChannelPayload, createChannelSchema } from "../types/discord";
import discordService from "../services/discord"

const discordRouter = Router()

discordRouter.post("/create-channel", async (req, res) => {
  const data = req.body as CreateChannelPayload;
  const validatedData = createChannelSchema.parse(data)

  const channelData = await discordService.createChannel(validatedData)

  return res.status(201).json(channelData)
})

discordRouter.put("/user-permission", async (req, res) => {
  try {
    const data = req.body as AddRemoveUserPermissionPayload;
    console.log(data)
    const validatedData = addRemoveUserPermissionSchema.parse(data)

    await discordService.addUserToChannel(validatedData.channelId, validatedData.userId)

    return res.status(204).json()
  } catch {
    return res.status(204).json()
  }
})

discordRouter.delete("/user-permission", async (req, res) => {
  try {
    const data = req.body as AddRemoveUserPermissionPayload;
    const validatedData = addRemoveUserPermissionSchema.parse(data)

    await discordService.removeUserFromChannel(validatedData.channelId, validatedData.userId)

    return res.status(204).json()
  } catch {
    return res.status(204).json()
  }
})

export default discordRouter
