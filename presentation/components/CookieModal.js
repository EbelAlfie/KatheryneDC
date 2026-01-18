import { ActionRowBuilder, ModalBuilder, TextInputBuilder } from "@discordjs/builders";
import { BaseComponent } from "../base/BaseComponent.js";
import { TextInputStyle } from "discord.js";

export class CookieModal extends BaseComponent { 
    static componentId = "modal_cookie"

    create() { 
        const cookieInput = new TextInputBuilder()
                .setCustomId("cookie")
                .setLabel("Cookie")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
        const inputRow = new ActionRowBuilder().addComponents(cookieInput)

        const modal = new ModalBuilder()
        .setCustomId(CookieModal.componentId)
        .setTitle("Register Cookie")
        .addComponents(inputRow)

        return modal
    }
}