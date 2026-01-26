import { StringRes } from "../../assets/Strings.js";
import { HoyoResponseCode } from "../../domain/error/StatusCode.js";
import { TaskModel, TaskType } from "../../domain/model/Task.js";
import { getTargetUser, getTomorrow, sendDMMessage } from "../utils.js";

export class CheckInTask {
    taskType = TaskType.CHECK_IN

    hoyoRepository
    taskRepository
    
    constructor(config) {
        const {
            hoyoRepository,
            taskRepository
        } = config
        this.hoyoRepository = hoyoRepository
        this.taskRepository = taskRepository
    }

    async run(task, client) {
        try {
            const userModel = task.userModel
            const cookie = userModel.cookies ?? ""
            
            await this.taskRepository.removeTask(task)
            const response = await this.hoyoRepository.checkIn(cookie)

            await this.taskRepository.addTask(
                TaskModel.newTask(
                    userModel,
                    this.taskType,
                    this.calculateNextExec()
                )
            )

            this.onOperationSuccess(userModel, client)
        } catch(error) {
            this.onOperationFailed(task, error, client)
        }
    }

    calculateNextExec() {
        const tomorrow = getTomorrow()
        tomorrow.setHours(1, 0, 0, 0)
        return tomorrow
    }

    async onOperationSuccess(userModel, client) { 
        const user = await getTargetUser(client, userModel.discordId)
        const userName = userModel.userGameRecord.nickname
        sendDMMessage(user, StringRes.message_success_checkin(userName))
    }

    async onOperationFailed(task, error, client) { 
        const userModel = task.userModel
        const user = await getTargetUser(client, userModel.discordId)
        const userName = userModel.userGameRecord.nickname
        let scheduleTime = new Date()
            switch(error.retcode) {
                case HoyoResponseCode.AlreadyCheckIn:
                    scheduleTime = this.calculateNextExec()
                    sendDMMessage(user, error.message)
                    break
                case HoyoResponseCode.NotLoggedIn:
                    sendDMMessage(user, StringRes.message_not_logged_in)
                    return
                default:
                    scheduleTime = new Date()
                    sendDMMessage(user, StringRes.message_failed_checkin(userName))
            }
            await this.taskRepository.addTask(
                TaskModel.newTask(
                    userModel,
                    this.taskType,
                    scheduleTime
                )
            )
    }
}