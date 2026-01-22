import { SlashCommandBuilder } from "discord.js";
import BaseCommand from "../base/BaseCommand.js";
import { StringRes } from "../../assets/Strings.js";

export class RedeemCode extends BaseCommand { 
    REDEEM_CODE_OPTION = "redeem_code"

    genshinService

    constructor(config) { 
        super()
        const { genshinService } = config
        
        this.genshinService = genshinService
    }

    data = new SlashCommandBuilder()
        .setName("redeem")
        .setDescription("A command to automatically redeem codes")
        .addStringOption((builder) =>
            builder
            .setName(this.REDEEM_CODE_OPTION)
            .setDescription("Genshin redemption code. You gotta hunt for it! 🎁")
            .setRequired(true)
        )

    async execute(interaction) { 
        const senderId = interaction.user.id
        const redeemCode = interaction.options.getString(this.REDEEM_CODE_OPTION) ?? ""

        if (redeemCode === "") { 
            interaction.reply(StringRes.message_invalid_redeem_code)
            return
        }

        try { 
            let { targetUser, response } = await this.genshinService.redeemCode(redeemCode, senderId)

            interaction.reply(StringRes.message_code_redeemed(targetUser.userGameRecord.nickname))
        } catch (error) {
            console.log(error)
            interaction.reply(error.message)
        }
    }
}