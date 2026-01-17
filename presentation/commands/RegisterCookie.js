import { SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import BaseCommand from "../models/BaseCommand.js";

export class RegisterCookie extends BaseCommand {
    OPTION_COOKIE = "cookie_value"

    userService
    
    constructor(config) { 
        super()
        const { 
            userService
        } = config
        this.userService = userService
    }

    data = new SlashCommandBuilder()
        .setName("cookie")
        .addStringOption(
            new SlashCommandStringOption()
            .setName(this.OPTION_COOKIE)
            .setRequired(true)
            .setDescription("Your hoyolab token cookie")
        )
        .setDescription("Command to register cookie to hoyolab")

    async execute(interaction)  {
        const cookie = interaction.options.getString(this.OPTION_COOKIE)
        const senderId = interaction.user.id
        if (!cookie || cookie === "") {
            return interaction.reply("Cookienya ga ada")
        } 

        try { 
            const response = await this.userService.login(senderId, cookie)

            interaction.reply("Success storing cookie")
        } catch (error) { 
            interaction.reply("Gagal login")
        }
    }
}