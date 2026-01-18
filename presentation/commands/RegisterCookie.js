import { SlashCommandBuilder, SlashCommandStringOption, TextInputBuilder, TextInputStyle } from "discord.js";
import BaseCommand from "../base/BaseCommand.js";
import { StringRes } from "../../assets/Strings.js";
import { RegisterButton } from "../components/RegisterButton.js";
import { CookieModal } from "../components/CookieModal.js";
import { isModalError } from "../utils.js";

export class RegisterCookie extends BaseCommand {
    userService
    
    constructor(config) { 
        super()
        const { userService } = config
        this.userService = userService
    }

    data = new SlashCommandBuilder()
        .setName("cookie")
        .setDescription("Command to register cookie to hoyolab")

    async execute(interaction)  {
        const registerButton = new RegisterButton()
        const dm = interaction.user.createDM()
        .then(result => {
            interaction.reply({ content: StringRes.message_checkdm, ephemeral: true })
            result.send({
                content: StringRes.message_greetings,
                components: [registerButton.create()]
            })
        })
        .catch(error => {
            interaction.reply({ content: 'Psstt! I cannot dm you', ephemeral: true })
        })
    }

    async showRegistrationForm(interaction) { 
        const modal = new CookieModal()
        interaction.showModal(modal.create())
    }

    async registerUser(interaction) { 
        let fields = interaction.fields
        
        let cookie = fields.fields.get("cookie")
        if (isModalError(cookie.value, interaction)) return 

        const senderId = interaction.user.id
        if (!cookie || cookie === "") {
            return interaction.reply("Cookienya ga ada")
        } 

        try { 
            const response = await this.userService.login(senderId, cookie)

            interaction.reply("Success storing cookie")
        } catch (error) { 
            interaction.reply("Gagal login")
        }
    }
}