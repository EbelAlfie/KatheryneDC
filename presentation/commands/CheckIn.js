import { SlashCommandBuilder } from "discord.js"
import BaseCommand from "../base/BaseCommand.js"
import { StringRes } from "../../assets/Strings.js"

export class CheckInCommand extends BaseCommand {
    genshinService
    
    constructor(config) { 
        super()
        const { 
            userService
        } = config
        this.genshinService = userService
    }

    data = new SlashCommandBuilder()
        .setName("checkin")
        .setDescription("Imediately checks you in to hoyolab")
        
    async execute(interaction) {
        try { 
            const senderId = interaction.user.id
            const response = this.genshinService.checkInByUser(senderId)
            
            interaction.channel.send(StringRes.message_success_checkin(response.targetUser))
        } catch(error) { 
            this.handleError(error, interaction)  
        }
    }

    async handleError(error, interaction) {
        interaction.channel.send(error.message)
    }
}