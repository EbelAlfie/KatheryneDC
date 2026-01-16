import { SlashCommandBuilder } from "discord.js"
import { isModalError } from "../utils.js"
import { LoginModalBuilder } from "../components/modals.js"
import BaseCommand from "../models/BaseCommand.js"
import { loginRequest } from "../../domain/request/Request.js"
import { LoginRequest } from "../../domain/request/LoginRequest.js"

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
        .setDescription("Command to register new user to hoyolab")

    async execute(interaction) {
        this.#showRegisterModal(interaction)    
    }

    handleError(error, interaction) {
        
    }

    #showRegisterModal(interaction) {
        const modal = new LoginModalBuilder() 
        interaction.showModal(modal.createComponent())
    }

    async onRegisterModalSubmitted(interaction) {
        let fields = interaction.fields

        let email = fields.fields.get("email")
        if (isModalError(email.value, interaction)) return 
        let password = fields.fields.get("password")
        if (isModalError(password.value, interaction)) return 
        
        const senderId = interaction.user.id
        const request = LoginRequest.fromTextField(email, password)

        this.userService.registerUser(senderId, request)
            .then(_ => this.#onRegistrationSuccess(interaction))
            .catch(error => this.#onRegistrationFailed(interaction, error))
    }

    async #onRegistrationSuccess(interaction) {
        interaction.reply("Register sukses yaa")
    }

    async #onRegistrationFailed(interaction, error) {
        interaction.reply(error.message)
    }
}