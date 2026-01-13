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
                newTask(
                    task.userModel,
                    task.type,
                    this.calculateNextExec()
                )
            )
        } catch(error) { 
            this.taskRepository.addTask(
                newTask(
                    task.userModel,
                    task.type,
                    Date.now()
                )
            )
        }
    }

    calculateNextExec() {
        const tomorrow = getTomorrow()
        tomorrow.setHours(1, 0, 0, 0)
        return tomorrow
    }
}