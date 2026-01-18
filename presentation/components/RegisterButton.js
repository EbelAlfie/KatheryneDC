import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js"
import { BaseComponent } from "../base/BaseComponent.js"

export class RegisterButton extends BaseComponent { 
    static componentId = "btn_register"

    create() { 
        const btnLogin = new ButtonBuilder()
        .setCustomId(RegisterButton.componentId)
        .setLabel('Register')
        .setStyle(ButtonStyle.Primary)
        return new ActionRowBuilder()
            .addComponents(btnLogin) 
    }
}