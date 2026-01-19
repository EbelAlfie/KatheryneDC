export function isModalError(value, interaction) {
    if (value === undefined || value === "") {
        interaction.reply({content : `${value} kamu tidak lengkap`})
        return true
    }
    return false
}

export function getTomorrow() {
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    return tomorrow
}