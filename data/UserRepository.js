import { HoyoResponseCode } from "../domain/model/HoyoResponseCodes.js"
import { localUserModel } from "../domain/model/Models.js"
import { newTask, TaskType } from "../domain/task/Task.js"

export class UserRepository { 
    localApi

    constructor(config) {
        const { localApi } = config
        this.localApi = localApi
    }

    isUserRegistered(discordId) {
        return this.localApi.isUserExist(discordId)
    }

    hasUser() {
        return !this.localApi.isUserListEmpty()
    }

    saveUser(discordId, result) {
        const {
            retcode = 0,
            headers = {},
        } = result ?? {}

        switch(retcode) {
            case HoyoResponseCode.ResponseSuccess : {
                let cookies = headers.get("set-cookie")
                if (cookies !== undefined) {
                    saveUserCookie(discordId, cookies)
                    Promise.resolve()
                } else 
                    Promise.reject("No cookie :(")
                break
            }
            default: 
                Promise.reject(result.message)
        }
    }

    saveUserCookie(discordId, cookies) {
        const userModel = localUserModel({
            discordId: discordId,
            cookies: cookies
        })
        this.localApi.storeUser(userModel)
        this.localApi.addTask(
            newTask(
                userModel,
                TaskType.CHECK_IN,
                Date.now()
            )
        )
        this.localApi.addTask(
            newTask(
                userModel,
                TaskType.DAILY,
                Date.now()
            )
        )
    }
}