import { Router } from "express";
import { CreateChannelPayload, createChannelSchema } from "../types/discord";
import discordService from "../services/discord"

const discordRouter = Router()

discordRouter.post("/create-channel", async (req, res) => {
  const data = req.body as CreateChannelPayload;
  console.log(data)
  const validatedData = createChannelSchema.parse(data)

  const channelData = await discordService.createChannel(validatedData)

  res.status(201).json(channelData)
})

export default discordRouter
