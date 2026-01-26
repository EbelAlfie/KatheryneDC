import { UserGameRecord } from "./UserGameRecord"

export class UserModel {
    constructor({
        discordId = "", 
        cookies = "",
        userGameRecord
    }) { 
        this.discordId = discordId
        this.cookies = this.adjustCookie(cookies)
        this.userGameRecord = userGameRecord
    }


    adjustCookie(cookie) { 
        const key = "account_mid_v2"
        if (this.getField(key, cookie) !== "") return 
        let mid = this.getField("ltmid_v2", cookie)
        return cookie + `${key}=${mid};`
    }

    getField(key, cookie) {
        if (!cookie || !key) return ""
        const regex = new RegExp(`(?:^|;\\s*)${key}=([^;]+)`)
        const matches = cookie.match(regex)
        return matches ? matches[1] : ""
    }

    getUid() { 
        return getField("ltuid_v2", this.cookies)
    }

    getGenshinRoleId() { 
        return this.userGameRecord.gameRoleId
    }

    getServerRegion() { 
        return this.userGameRecord.region
    }

    static fromDatabase(userData) { 
        const userGameRecord = new UserGameRecord({
            gameId: userData.game_id,
            gameRoleId: userData.game_role_id,
            nickname: userData.nickname,
            region: userData.region
        })
        return new UserModel({
            discordId: userData.discord_id,
            cookies: userData.cookie,
            userGameRecord: userGameRecord
        })
    }
}