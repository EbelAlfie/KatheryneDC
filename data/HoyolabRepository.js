import { ResponseSuccess } from "../domain/CheckInResCode.js"
import { newTask, TaskType } from "../domain/task/Task.js"
import onlineApi from "./source/api.js"
import localApi from "./source/local.js"

class HoyolabRepository {
    constructor() {}

    /** Public */
    async registerUser(senderId, userModel) {
        if (localApi.isUserExist(senderId)) 
            throw Error("User already exist")

        return onlineApi.login(userModel)
            .then(response => {
                this.#saveUserToLocal(response, senderId, userModel)
            })
    }

    hasUser() {
        return !localApi.isUserListEmpty()
    }

    async checkInAllUser(item) {
        return onlineApi.checkIn(item.join("; "))
    }

    /** Privates */
    #saveUserToLocal(result, discordId, userModel) {
        const {
            retcode = 0,
            headers = {},
        } = result ?? {}

        switch(retcode) {
            case ResponseSuccess : {
                let cookies = headers.get("set-cookie")
                if (cookies !== undefined) {
                    let localUserModel = localUserModel(discordId, userModel, cookies)
                    localApi.storeUser(discordId, userModel, cookies)
                    localApi.addTask(
                        newTask(
                            userModel,
                            TaskType.CHECK_IN,
                            Date.now()
                        )
                    )
                    localApi.addTask(
                        newTask(
                            userModel,
                            TaskType.DAILY,
                            Date.now()
                        )
                    )
                    Promise.resolve()
                } else 
                    Promise.reject("No cookie :(")
                break
            }
            default: 
                Promise.reject(result.message)
        }
    }
}

export const hoyoRepository = new HoyolabRepository()