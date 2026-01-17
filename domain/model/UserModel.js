export class UserModel {
    constructor({
        discordId = "", 
        cookies = "",
        userGameRecord
    }) { 
        this.discordId = discordId
        this.cookies = cookies
        this.userGameRecord = userGameRecord
    }

    getUid() { 
        const key = "ltuid_v2="
        const regex = new RegExp(`(?:^|;\\s*)${key}([^;]+)`)
        const matches = this.cookies.match(regex)
        return matches[1]
    }

    getGenshinRoleId() { 
        return this.userGameRecord.gameRoleId
    }

    getServerRegion() { 
        return this.userGameRecord.region
    }
}