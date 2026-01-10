class Local {
    userData = [] //Pair of email and cookies

    task = []

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
        this.userData.push(newUser)
    }

    addTask(newTask) { 
        this.task.push(newTask)
    }

    removeTask() {
        this.task = this.task.filter((value) => value.date > Date.now())
    }

    getTask() {
        const selectedTasks = this.task.filter(value => value.date <= Date.now())
        return selectedTasks
    }
}

let localApi = new Local() 
export default localApi