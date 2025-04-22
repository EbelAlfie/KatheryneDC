import { SlashCommandBuilder } from "discord.js"
import { isModalError } from "../utils.js"
import { LoginModalBuilder } from "../components/modals.js"
import { hoyoRepository } from "../../data/HoyolabRepository.js"
import BaseCommand from "../models/BaseCommand.js"
import { eventBus } from "../models/EventBus.js"

/** A slash command to register users to hoyolab api */
class RegisterCommand extends BaseCommand {
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

        eventBus.registerEvent(
            LoginModalBuilder.componentId, 
            this.onRegisterModalSubmitted.bind(this)
        )
        
        interaction.showModal(modal.createComponent())
    }

    async onRegisterModalSubmitted(interaction) {
        let fields = interaction.fields

        let email = fields.fields.get("email")
        if (isModalError(email.value, interaction)) return 
        let password = fields.fields.get("password")
        if (isModalError(password.value, interaction)) return 
        
        const request = {
            email: email.value,
            password: password.value
        }

        hoyoRepository.registerUser(request)
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

export const command = new RegisterCommand()