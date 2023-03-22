import { Client, GatewayIntentBits } from "discord.js"
import dotenv from "dotenv"

dotenv.config()

const discordBotClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildInvites,
  ]
})

discordBotClient.login(process.env.DISCORD_TOKEN)

discordBotClient.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;
})

export default discordBotClient
