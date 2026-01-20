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

export async function getTargetUser(client, discordId) {
    try { 
        return await client.users.fetch(discordId)
    } catch(error) { 
        console.warn("Failed Fetching user:", error.code || error.message)
        return null
    }
}

export async function sendDMMessage(user, message) { 
    try { 
        await user.send(message)
    } catch(error) { 
        console.warn(`DM failed ${user.id}:`, error.code || error.message)
    }
}