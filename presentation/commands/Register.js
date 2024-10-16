import { SlashCommandBuilder } from "discord.js"
import { isModalError } from "../utils.js"
import { LoginModalBuilder } from "../components/modals.js"
import { hoyoRepository } from "../../data/HoyolabRepository.js"
import BaseCommand from "../models/BaseCommand.js"

class RegisterCommand extends BaseCommand {
    data = new SlashCommandBuilder()
        .setName("register")
        .setDescription("Command to register new user to hoyolab")

    async execute(interaction) {
        const modal = new LoginModalBuilder()
        interaction.showModal(modal.createComponent())

        const submitted = await interaction.awaitModalSubmit({
            time: 60000,
          }).catch(error => {
            console.error(error)
            return null
          })
          
        if (submitted) await this.onModalSubmitted(submitted)
    }

    handleError(error, interaction) {

    }

    async onModalSubmitted(interaction) {
        let fields = interaction.fields

        let email = fields.fields.get("email")
        if (isModalError(email.value, interaction)) return 
        let password = fields.fields.get("password")
        if (isModalError(password.value, interaction)) return 
        
        hoyoRepository.registerUser(
            {
                email: email.value,
                password: password.value
            },
            {
                onSucess: () => 
                    this.#onRegistrationSuccess(interaction),
                onFailed: error => 
                    this.#onRegistrationFailed(interaction, error)
            }
        )
    }

    async #onRegistrationSuccess(interaction) {
        interaction.reply("Register sukses yaa")
    }

    async #onRegistrationFailed(interaction, error) {
        interaction.reply(error.message)
    }
}

export const command = new RegisterCommand()