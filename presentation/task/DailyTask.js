import { StringRes } from "../../assets/Strings.js"
import { HoyoResponseCode, StatusCodes } from "../../domain/error/StatusCode.js"
import { TaskModel, TaskType } from "../../domain/model/Task.js"
import { getTargetUser, sendDMMessage } from "../utils.js"

export class DailyTask {
    taskType = TaskType.DAILY

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

            const notesResponse = await this.hoyoRepository.getDailyNote(userModel)
            
            const newDate = this.calculateNextExec(notesResponse)
            this.taskRepository.addTask(
                TaskModel.newTask(
                    userModel, 
                    this.taskType,
                    newDate
                )
            )
            
            this.onOperationSuccess(notesResponse, userModel, client)
        } catch (error) { 
            this.onOperationFailed(task, error, client)
        }
    }

    calculateNextExec(dailyNotes) {
        return dailyNotes.estimateResinRecoverDate().getTime()
    }

    async onOperationSuccess(dailyNote, userModel, client) { 
        const user = await getTargetUser(client, userModel.discordId)
        const userName = userModel.userGameRecord.nickname
        const threshold = 100
        const currentResin = dailyNote.currentResin
        const resinUntilFull = dailyNote.maxResin - currentResin

        let message = StringRes.message_resin_full(userName, currentResin)
        if (resinUntilFull > threshold) { 
            message = StringRes.message_resin_empty(userName, currentResin)
        }
        if (resinUntilFull < threshold) { 
            message = StringRes.message_resin_almost_full(userName, currentResin)
        }

        sendDMMessage(user, message)
    }

    async onOperationFailed(task, error, client) { 
        const userModel = task.userModel
        const user = getTargetUser(client, userModel.discordId)
        const userName = userModel.userGameRecord.nickname

        let scheduleTime = Date.now()
        switch(error.retcode) {
            case StatusCodes.NotLoggedIn:
                sendDMMessage(user, StringRes.message_not_logged_in)
                return
            default:
                sendDMMessage(user, error.message)
                scheduleTime = Date.now()
        }
        this.taskRepository.addTask(
            TaskModel.newTask(
                task.userModel, 
                this.taskType,
                scheduleTime
            )
        )
    }
}