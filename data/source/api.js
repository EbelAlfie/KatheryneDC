class Api {
    checkIn = require("./CheckIn")
    key = null

    constructor() {
        this.#initApi()
    }

    #initApi() {
        const NodeRSA = require("encrypt-rsa").default
        this.key = new NodeRSA(process.env.MIHOYO_ENCRYPTION_KEY)
    }

    checkIn() {
        return checkIn()
    }

    login(user) {
        console.log(process.env.MIHOYO_ENCRYPTION_KEY)
        const encryptedEmail = this.key?.encryptStringWithRsaPublicKey({
            text: user.email,
            publicKey: process.env.MIHOYO_ENCRYPTION_KEY
        })

        const encryptedPass = this.key?.encryptStringWithRsaPublicKey({
            text: user.password,
            publicKey: process.env.MIHOYO_ENCRYPTION_KEY
        })

        let newRequest = {
            email: encryptedEmail||"",
            password: encryptedPass||"",
            tokenType: 2
        }
        
        return login(newRequest)
            .then(result => {
                let cookies = result.headers["set-cookie"]
                if (cookies !== undefined)
                    localApi.login(request, cookies)
                return result
            })
    }

}

class Local {
    userData = new Map() //Pair of userdata and cookies

    constructor() {}

    allUsers() {
        return this.userData
    }

    isUserListEmpty() {
        return this.userData.size >= 0
    }

    login(newUserData) {
        userData.push(newUserData)
    }
}

const onlineApi = new Api()

const localApi = new Local()

module.exports = { onlineApi, localApi }