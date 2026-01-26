import { UserGameRecord } from "./UserGameRecord.js"
import { UserModel } from "./UserModel.js"

export const TaskType = Object.freeze({ 
    CHECK_IN: "CHECK_IN",
    DAILY: "DAILY"
})

export class TaskModel {
    constructor({userModel, type, date}) {
        this.userModel = userModel
        this.type = type
        this.date = date
    }

    static newTask(userModel, type, date) {
        return new TaskModel({
            userModel: userModel,
            type: type,
            date: date
        })
    }

    static fromDatabase(taskData) {
        const userGameRecord = new UserGameRecord({
            gameId: taskData.game_id,
            gameRoleId: taskData.game_role_id,
            nickname: taskData.nickname,
            region: taskData.region
        })
        const userModel = new UserModel({
            userId: taskData.user_id,
            discordId: taskData.discord_id,
            cookies: taskData.cookies,
            userGameRecord: userGameRecord
        })
        return new TaskModel({
            userModel: userModel,
            type: taskData.task_type,
            date: taskData.schedule
        })
    }
}
