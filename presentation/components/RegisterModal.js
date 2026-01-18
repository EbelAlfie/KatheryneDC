import { TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalBuilder } from "discord.js"
import { BaseComponent } from "../base/BaseComponent.js"

export class RegisterModalBuilder extends BaseComponent {
    static componentId = "modal_register"

    create() {
        const userInput = new TextInputBuilder()
        .setCustomId("email")
        .setLabel("Email")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    
        const passInput = new TextInputBuilder()
        .setCustomId("password")
        .setLabel('Password')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    
        const username = new ActionRowBuilder().addComponents(userInput)
        const password = new ActionRowBuilder().addComponents(passInput)
    
        return new ModalBuilder()
            .setCustomId(RegisterModalBuilder.componentId)
            .setTitle("Minta username")
            .setComponents(
                username, password
            )
    }
}