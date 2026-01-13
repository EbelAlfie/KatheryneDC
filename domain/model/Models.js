export function localUserModel(model) {
    const {
        discordId = "", 
        cookies = ""
    } = model
    return {
        discordId: discordId,
        cookies: cookies
    }
}