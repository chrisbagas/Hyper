import { REST } from "discord.js";

const discordRESTClient = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN ?? "");

export default discordRESTClient;
