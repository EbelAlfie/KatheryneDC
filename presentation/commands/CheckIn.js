import { SlashCommandBuilder } from "discord.js"
import BaseCommand from "../models/BaseCommand.js"
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
        // if (!this.checkInScheduler.isAnyUserRegistered()) 
        //     this.handleError(HoyoResponseCode.NoUserError, interaction)
        // else    
        //     hoyoRepository.checkIn(
        //         {
        //             onSuccess: result => this.sendCheckInMessage(result, interaction),
        //             onError: error => this.handleError(error, interaction)
        //         }
        //     )
    }

    async handleError(error, interaction) {
        // switch(error) {
        //     case StatusCodes.NoUserError: {
        //         //Show modal
        //         await register.command.execute(interaction)
        //         break; 
        //     }
        //     default: 
        //         interaction.channel.send('Maaf yaa lagi error')
        // }
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