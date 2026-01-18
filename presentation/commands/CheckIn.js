import { SlashCommandBuilder } from "discord.js"
import BaseCommand from "../base/BaseCommand.js"
import { HoyoResponseCode } from "../../domain/model/StatusCode.js"

export class CheckInCommand extends BaseCommand {
    userService
    
    constructor(config) { 
        super()
        const { 
            userService
        } = config
        this.userService = userService
    }

    data = new SlashCommandBuilder()
        .setName("checkin")
        .setDescription("Imediately checks you in to hoyolab")
        
    async execute(interaction) {
        
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