import {Client, GatewayIntentBits, Events } from "discord.js" ;
import { Soul } from"./presentation/Soul.js" ;
import 'dotenv/config'
import { env } from 'node:process'

const ayakaDiscord = env.AYAKA_DC_TOKEN

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessageTyping,
] }) 

const ayaka = new Soul();

client.once(Events.ClientReady, () => {
    client.channels.fetch
    ayaka.onReady(client)
}) ;

client.on(Events.MessageCreate, interaction => {
    ayaka.reply(interaction)
}) ;

client.on(Events.InteractionCreate, interaction => {
    ayaka.command(interaction)
})

console.log("Logging in...") ;
client.login(ayakaDiscord) ;