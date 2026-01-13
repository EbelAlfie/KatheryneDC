import { MainScheduler } from "./module/MainScheduler.js";
import { CommandModule } from "./module/CommandModule.js";
import { HoyolabRepository } from "../data/HoyolabRepository.js";

export class Soul {
    command = new CommandModule()
    scheduler = new MainScheduler()
    
    /** Called when the bot has logged in */
    onReady(client) {
        //this.#setIdentity(client)
        console.log(`Logged in as ${client.user.tag}`) ;
        this.registerCommandV2(client)
        this.scheduler.init({
            client: client,
            hoyoRepository: new HoyolabRepository()//TODO
        })
        this.scheduler.start()
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
    async onCommand(interaction) {
        this.command.handleCommand(interaction)
    }

}