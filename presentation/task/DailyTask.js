import { HoyoResponseCode, StatusCodes } from "../../domain/model/StatusCode.js"
import { TaskModel, TaskType } from "../../domain/model/Task.js"

export class DailyTask {
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
                    TaskType.DAILY,
                    newDate
                )
            )
        } catch (error) { 
            let scheduleTime = Date.now()
            switch(error.retcode) {
                case StatusCodes.NotLoggedIn:
                    return
                default:
                    scheduleTime = Date.now()
            }
            this.taskRepository.addTask(
                TaskModel.newTask(
                    task.userModel, 
                    TaskType.DAILY,
                    scheduleTime
                )
            )
        }
    }

    calculateNextExec(dailyNotes) {
         return Date.now()
    }
}