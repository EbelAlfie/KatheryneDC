export class Local {
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

    removeTask(param) {
        const { time = Date.now() } = param
        this.task = this.task.filter((value) => value.date > time)
    }

    getTask(param) {
        const { by = Date.now() } = param
        const selectedTasks = this.task.filter(value => value.date <= by)
        console.log((new Date(by)).toLocaleString('id-ID'))
        selectedTasks.forEach((value) => {
            console.log(new Date(value.date).toLocaleString('id-ID'))
            console.log(value.date === by)
        })
        return selectedTasks
    }
}