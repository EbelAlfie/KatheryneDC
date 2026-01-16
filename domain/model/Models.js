export class UserModel { 
    constructor({
        discordId = "", 
        cookies = ""
    }) { 
        this.discordId = discordId
        this.cookies = cookies
    }
}