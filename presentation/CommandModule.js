import { REST, Routes, Collection } from "discord.js";
import { CheckInCommand } from "./commands/CheckIn.js";
import BaseCommand from "./base/BaseCommand.js";
import { RegisterCommand } from "./commands/RegisterCommand.js";
import { RegisterButton } from "./components/RegisterButton.js";
import { RegisterModalBuilder } from "./components/RegisterModal.js";
import { CookieModal } from "./components/CookieModal.js";
import { RedeemCode } from "./commands/RedeemCode.js";

export class CommandModule {
    userService
    genshinService
    slashCommand

    constructor(config) {
        const { userService, genshinService } = config
        this.userService = userService
        this.genshinService = genshinService

        this.slashCommand = [
            new RegisterCommand({ userService: this.userService }),
            new CheckInCommand({ genshinService: this.genshinService }),
            new RedeemCode({ genshinService: this.genshinService })
        ]
    }

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

        switch(interaction.customId) { 
            case RegisterButton.componentId:
                this.slashCommand[0].showRegistrationForm(interaction)
                break;
            case CookieModal.componentId:
                this.slashCommand[0].registerUser(interaction)
                break;
        }
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