import express from "express"
import dotenv from "dotenv"
import discordBotClient from "./engines/discord/discordBotClient"
import router from "./routes"

dotenv.config()

const app = express()
app.disable("x-powered-by");

const port = process.env.PORT || 3001

app.use(express.json())

app.use(router)

app.listen(port, () => {
  console.log(`Discord service is listening on port ${port}`)
})

discordBotClient.on("ready", () => {
  console.log("Bot is ready")
})
