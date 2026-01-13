import { REST, Routes, Collection } from "discord.js";
import { RegisterCommand } from "../commands/Register.js";
import { CheckInCommand } from "../commands/CheckIn.js";
import BaseCommand from "../models/BaseCommand.js";
import { LoginModalBuilder } from "../components/modals.js";
import { RegisterCookie } from "../commands/RegisterCookie.js";
import { UserService } from "../../domain/services/UserService.js";
import { provideUserService } from "../../dependencyProviders.js";

export class CommandModule {
    userService = provideUserService()

    slashCommand = [
        new RegisterCommand({ userService: this.userService }),
        new CheckInCommand({ userService: this.userService }),
        new RegisterCookie({ userService: this.userService })
    ]

    registerCommands(client) {
        client.commands = new Collection()
        let commands = []

        for (const command of this.slashCommand) {
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

    async handleCommand(interaction) {
        if (interaction.isChatInputCommand()) this.#handleChatCommand(interaction)

        if (interaction.customId === LoginModalBuilder.componentId) this.slashCommand[0].onRegisterModalSubmitted(interaction)
    }

    async #handleChatCommand(interaction) {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            interaction.reply({ content: 'Ga kenal commandnya', ephemeral: true })
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
}