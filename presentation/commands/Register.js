import { SlashCommandBuilder } from "discord.js"
import { isModalError } from "../utils.js"
import BaseCommand from "../base/BaseCommand.js"
import { LoginRequest } from "../../domain/request/LoginRequest.js"
import { RegisterModalBuilder } from "../components/RegisterModal.js"

/** A slash command to register users to hoyolab api */
export class RegisterCommand extends BaseCommand {
    userService

    constructor(config) { 
        super()
        const { 
            userService
        } = config
        this.userService = userService
    }

    data = new SlashCommandBuilder()
        .setName("register")
        .setDescription("Command to register new user to hoyolab. Katherine will DM you")

    async execute(interaction) {
        const modal = new RegisterModalBuilder() 
        interaction.showModal(modal.create())
    }

    handleError(error, interaction) {
        
    }

    async onRegisterModalSubmitted(interaction) {
        try {
            let fields = interaction.fields

            let email = fields.fields.get("email")?.value
            if (isModalError(email.value, interaction)) return 
            let password = fields.fields.get("password")?.value
            if (isModalError(password.value, interaction)) return 
            
            const senderId = interaction.user.id
            const request = LoginRequest.fromTextField(email, password)

            await this.userService.registerUser(senderId, request)

            interaction.reply("Register sukses yaa")
        } catch(error) {
            interaction.reply(error.message)
        }
    }
}