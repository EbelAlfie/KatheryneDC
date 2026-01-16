import { TaskModel, TaskType } from "../../domain/model/Task"

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
            const notes = await this.hoyoRepository.getDailyNote()
            
            const newDate = this.calculateNextExec(notes)
            this.taskRepository.addTask(
                TaskModel.newTask(
                    task.userModel, 
                    TaskType.DAILY,
                    newDate
                )
            )
        } catch (error) { 
            
            this.taskRepository.addTask(
                TaskModel.newTask(
                    task.userModel, 
                    TaskType.DAILY,
                    Date.now()
                )
            )
        }
    }

    calculateNextExec(dailyNotes) {
         return Date.now()
    }
}