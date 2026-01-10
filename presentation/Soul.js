import { CheckInScheduler } from "./module/CheckinScheduler.js";
import { CommandModule } from "./module/CommandModule.js";

export class Soul {
    command = new CommandModule()
    scheduler = new CheckInScheduler()
    
    /** Called when the bot has logged in */
    onReady(client) {
        //this.#setIdentity(client)
        console.log(`Logged in as ${client.user.tag}`) ;
        this.registerCommandV2(client)
        this.scheduler.setClient(client)
    }

    #setIdentity(client) {
        client.user.setAvatar('assets/avatar.png');
        client.user.setUsername("Katheryne");
    }

    async reply(interaction) {
        if (interaction.author.bot) return

        await interaction.channel.send("Ad astra abysosque") ;
    }

    /** Register all available slash command from commands folder*/
    async registerCommandV2(client) {
        this.command.registerCommands(client)
    }

    /** Command handler */
    async command(interaction) {
        this.command.handleCommand(interaction)
    }

}