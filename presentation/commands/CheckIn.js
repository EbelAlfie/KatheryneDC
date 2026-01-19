import { SlashCommandBuilder } from "discord.js"
import BaseCommand from "../base/BaseCommand.js"
import { HoyoResponseCode } from "../../domain/model/StatusCode.js"

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
            const checkInResponse = this.genshinService.checkInByUser(senderId)
            
        } catch(error) { 
            this.handleError(error, interaction)  
        }
    }

    async handleError(error, interaction) {
        
    }
    
    sendCheckInMessage(result, interaction) {
        let message = "Yahh gagal checkin"
        if (result.retcode != HoyoResponseCode.ResponseSuccess)
            message = result.data.message
        else 
            message = "Sukses check in ya, traveler"
    
        interaction.channel.send(message)
    }
}