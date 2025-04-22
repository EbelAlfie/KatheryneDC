import { REST, Routes, Collection } from "discord.js";
import { CommandHandler } from "./InteractionHandler.js";
import { readdirSync } from "node:fs"
import { pathToFileURL } from "url"
import { join } from "node:path"
import BaseCommand from "./models/BaseCommand.js";

export class Soul {
    /** Called when the bot has logged in */
    onReady(client) {
        //this.#setIdentity(client)
        console.log(`Logged in as ${client.user.tag}`) ;
        this.#registerCommand(client)
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
    async #registerCommand(client) {
        client.commands = new Collection()

        const foldersPath = join(import.meta.dirname, 'commands')
        const commandFolders = readdirSync(foldersPath)

        let commands = []

        for (const file of commandFolders) {
            const commandPath = join(foldersPath, file)
            const formattedPath = pathToFileURL(commandPath)
            const command = (await import(formattedPath)).command
            
            if (command instanceof BaseCommand) {
                client.commands.set(command.data.name, command)
                commands.push(command.data.toJSON())
            } else {
                console.log(`[WARNING] The command at ${commandPath} is missing a required "data" or "execute" property.`);
            }
        }

        let rest = new REST().setToken(client.token)

        rest.put(
            Routes.applicationCommands(client.application.id),
            { body: commands },
        ).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        });
    }

    /** Command handler */
    async command(interaction) {
        CommandHandler(interaction) ;
    }

}