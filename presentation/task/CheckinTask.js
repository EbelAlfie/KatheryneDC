import { HoyoResponseCode } from "../../domain/model/StatusCode.js";
import { TaskModel, TaskType } from "../../domain/model/Task.js";
import { getTomorrow } from "../utils.js";

export class CheckInTask {
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
            const cookie = task?.userModel?.cookies ?? ""
            
            this.taskRepository.removeTask(task)
            const response = await this.hoyoRepository.checkIn(cookie)

            this.taskRepository.addTask(
                TaskModel.newTask(
                    task.userModel,
                    TaskType.CHECK_IN,
                    this.calculateNextExec()
                )
            )
        } catch(error) { 
            let scheduleTime = Date.now
            switch(error.retcode) {
                case HoyoResponseCode.AlreadyCheckIn:
                    scheduleTime = this.calculateNextExec()
                    break
                case HoyoResponseCode.NotLoggedIn:
                    return
                default:
                    scheduleTime = Date.now()
            }
            this.taskRepository.addTask(
                TaskModel.newTask(
                    task.userModel,
                    TaskType.CHECK_IN,
                    scheduleTime
                )
            )
        }
    }

    calculateNextExec() {
        const tomorrow = getTomorrow()
        tomorrow.setHours(1, 0, 0, 0)
        return tomorrow.getTime()  
    }
}