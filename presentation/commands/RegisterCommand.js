import { SlashCommandBuilder, SlashCommandStringOption, TextInputBuilder, TextInputStyle } from "discord.js";
import BaseCommand from "../base/BaseCommand.js";
import { StringRes } from "../../assets/Strings.js";
import { RegisterButton } from "../components/RegisterButton.js";
import { CookieModal } from "../components/CookieModal.js";
import { isModalError } from "../utils.js";

export class RegisterCommand extends BaseCommand {
    userService

    registerButton
    
    constructor(config) { 
        super()
        const { userService } = config
        this.userService = userService

        this.registerButton = new RegisterButton().create()
    }

    data = new SlashCommandBuilder()
        .setName("register")
        .setDescription("Command to register your hoyolab cookie. Katheryne will send a DM")

    async execute(interaction)  {
        const dm = interaction.user.createDM()
        .then(result => {
            interaction.reply({ content: StringRes.message_checkdm, ephemeral: true })
            result.send({
                content: StringRes.message_greetings,
                components: [this.registerButton]
            })
        })
        .catch(error => {
            interaction.reply({ content: StringRes.message_failed_dm, ephemeral: true })
        })
    }

    async showRegistrationForm(interaction) { 
        const modal = new CookieModal()
        interaction.showModal(modal.create())
    }

    async registerUser(interaction) { 
        let fields = interaction.fields
        
        let cookie = fields.fields.get("cookie")?.value
        if (isModalError(cookie, interaction)) return 

        const senderId = interaction.user.id
        if (!cookie || cookie === "") {
            return interaction.reply("Cookienya ga ada")
        } 

        try { 
            const response = await this.userService.login(senderId, cookie)

            interaction.reply(StringRes.message_success_regist)
        } catch (error) { 
            console.log(error)
            interaction.reply("Gagal login")
        }
    }
}