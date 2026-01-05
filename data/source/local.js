class Local {
    userData = [] //Pair of email and cookies

    constructor() {
        // Sample this.userData.set("johndoe@gmail.com", ["token=goblog", "token=anjing"])
    }

    allUsers() {
        return this.userData
    }

    isUserListEmpty() {
        return this.userData.size <= 0
    }

    isUserExist(discordId) {
        return this.userData.find((value, index) => value.userDiscordId == discordId) != undefined
    }

    storeUser(newUser) {
        this.userData.concat(newUser)
    }
}

let localApi = new Local() 
export default localApi