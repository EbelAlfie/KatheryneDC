export function localUserModel(discordId, userModel, cookies) {
    const {
        email= "",
        password = ""
    } = userModel

    return {
        userDiscordId: discordId,
        email: email,
        password: password,
        cookies: cookies
    }
}