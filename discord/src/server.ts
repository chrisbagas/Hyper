import express from "express"
import dotenv from "dotenv"
import discordBotClient from "./engines/discord/bot"

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Discord service is listening on port ${port}`)
})

discordBotClient.on("ready", () => {
  console.log("Bot is ready")
})
