import { CommandModule } from "./CommandModule.js";
import { HoyolabRepository } from "../data/HoyolabRepository.js";
import { TaskRepository } from "../data/TaskRepository.js";
import { Local } from "../data/source/local.js";
import { UserService } from "../domain/services/UserService.js";
import { UserRepository } from "../data/UserRepository.js";
import { GenshinService } from "../domain/services/GenshinService.js";
import { MainScheduler } from "./MainScheduler.js";

export class Soul {
    //TODO DI?
    localApi = new Local()

    hoyoRepository = new HoyolabRepository()
    userRepository = new UserRepository({
        localApi: this.localApi
    })
    taskRepository = new TaskRepository({ localApi: this.localApi })

    userService = new UserService({
        hoyoRepository: this.hoyoRepository,
        userRepository: this.userRepository
    })

    genshinService = new GenshinService({
        hoyoRepository: this.hoyoRepository,
        userRepository: this.userRepository,
        taskRepository: this.taskRepository
    })

    command = new CommandModule({ userService: this.userService })
    scheduler = new MainScheduler()
    
    /** Called when the bot has logged in */
    onReady(client) {
        //this.#setIdentity(client)
        console.log(`Logged in as ${client.user.tag}`) ;
        this.registerCommandV2(client)
        this.scheduler.init({
            discordClient: client,
            hoyoRepository: this.hoyoRepository, 
            taskRepository: this.taskRepository
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