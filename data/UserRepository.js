import { HoyoResponseCode } from "../domain/error/StatusCode.js"
import { UserModel } from "../domain/model/UserModel.js"
import { TaskModel, TaskType } from "../domain/model/Task.js"
import { UserNotFoundError } from "../domain/error/Errors.js"

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

    async getUserById(discordId) {
        const targetUser = await this.localApi.getUserById(discordId)
        if (!targetUser || targetUser === null)
            throw new UserNotFoundError()
        return targetUser
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

   async saveUserCookie(discordId, cookies, userGameRecord) {
        const userModel = new UserModel({
            discordId: discordId,
            cookies: cookies,
            userGameRecord: userGameRecord
        })
        const result = await this.localApi.storeUser(userModel)
        console.log(`result ${result}`)
        this.localApi.addTask(
            TaskModel.newTask(
                userModel,
                TaskType.CHECK_IN,
                Date.now()
            )
        )
        this.localApi.addTask(
            TaskModel.newTask(
                userModel,
                TaskType.DAILY,
                Date.now()
            )
        )
    }
}