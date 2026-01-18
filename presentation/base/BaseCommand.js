export default class BaseCommand {
    data = null

    async execute(interaction) {}

    async handleError(error, interaction) {}
}