export function isModalError(value, interaction) {
    if (value === undefined) {
        interaction.reply({content : `${value} kamu tidak lengkap`})
        return true
    }
    return false
}

export function getTomorrow() {
    const today = new Date()
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
}