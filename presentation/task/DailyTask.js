import { EmbedBuilder } from "discord.js"
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

            await this.taskRepository.reschedule(task.id, newDate)
            
            this.onOperationSuccess(notesResponse, userModel, client)
        } catch (error) { 
            this.onOperationFailed(task, error, client)
        }
    }

    calculateNextExec(dailyNotes) {
        return dailyNotes.estimateResinRecoverDate()
    }

    async onOperationSuccess(dailyNote, userModel, client) { 
        const user = await getTargetUser(client, userModel.discordId)
        const userName = userModel.userGameRecord.nickname
        let resin = this.getResinMessage(dailyNote, userName)
        let coin = this.getTeapotMessage(dailyNote, userName)
        let commision = this.getCommisionMessage(dailyNote, userName)
        sendDMMessage(user, resin)
        sendDMMessage(user, coin)
        if (commision) sendDMMessage(user, commision)

        await this.sendExpeditionTeam(dailyNote, user)
    }

    getResinMessage(dailyNote, userName) { 
        const threshold = 100
        const currentResin = dailyNote.currentResin
        const resinUntilFull = dailyNote.maxResin - currentResin

        let message = StringRes.message_resin_full(userName, currentResin)
        if (resinUntilFull > threshold) 
            message = StringRes.message_resin_empty(userName, currentResin)
        if (resinUntilFull <= threshold) 
            message = StringRes.message_resin_almost_full(userName, currentResin)
        if (resinUntilFull === 0) 
            message = StringRes.message_resin_full(userName, currentResin)
        return message
    }

    getTeapotMessage(dailyNote, userName) { 
        const threshold = 1000
        const current = dailyNote.currentHomeCoin
        const untilFull = dailyNote.maxHomeCoin - current

        let message = StringRes.message_teapot_full(current)
        if (untilFull > threshold) 
            message = StringRes.message_teapot_empty(current)
        if (untilFull <= threshold) 
            message = StringRes.message_teapot_almost_full(current)
        if (untilFull === 0) 
            message = StringRes.message_teapot_full(current)
        return message
    }

    getCommisionMessage(dailyNote, userName) { 
        const commisionLeft = dailyNote.totalTaskNum - dailyNote.finishedTaskNum
        const isRewardClaimed = dailyNote.isExtraTaskRewardReceived
        let message
        if (commisionLeft > 0) 
            message = StringRes.message_commision_warning(commisionLeft)
        if (!isRewardClaimed)
            message = StringRes.message_claim_reward(userName)
        return message
    }

    async sendExpeditionTeam(dailyNote, user) { 
        const expeditionMessage = dailyNote.expeditions.map((value) => {
            return new EmbedBuilder()
            .setThumbnail(value?.avatar_side_icon ?? "")
            .setDescription(value?.status ?? "")
        })
        
        if (expeditionMessage.length <= 0)
            sendDMMessage(user, StringRes.message_no_expeditions)
        else {
            await user.send({ embeds: expeditionMessage })
        }
    }

    async onOperationFailed(task, error, client) { 
        const userModel = task.userModel
        const user = await getTargetUser(client, userModel.discordId)
        const userName = userModel.userGameRecord.nickname

        let scheduleTime = new Date()
        switch(error.retcode) {
            case StatusCodes.NotLoggedIn:
                sendDMMessage(user, StringRes.message_not_logged_in)
                return
            default:
                sendDMMessage(user, error.message)
                scheduleTime = new Date()
        }
        await this.taskRepository.reschedule(task.id, scheduleTime)
    }
}