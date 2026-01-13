import nodeCron from "node-cron"
import { CheckInTask } from "../task/CheckinTask.js"
import { newTask, TaskType } from "../../domain/model/Task.js"

export class MainScheduler {
    discordClient
    hoyoRepository
    taskRepository
    checkin
    
    scheduler

    init(config) {
        const {
            hoyoRepository,
            taskRepository,
            discordClient
        } = config
        this.discordClient = discordClient
        this.hoyoRepository = hoyoRepository
        this.taskRepository = taskRepository

        this.checkin = new CheckInTask(config)
    }

    /** Public */
    start() {
        if (this.scheduler || !this.discordClient) return 

        this.scheduler = nodeCron.schedule("0 * * * * *",
            async () => {
                const dueTasks = this.taskRepository.getTask()
                console.log(`Due Task ${dueTasks}`)
                for (const task of dueTasks) {
                    this.#processTask(task)
                }
            }
        )
    }

    #processTask(task) {
        switch (task.type) {
            case TaskType.CHECK_IN:
                this.checkin.run(task, this.discordClient)
            default:
                break;
        }
    }

    stopReminder() {
        if (!this.scheduler) return
        clearInterval(this.scheduler)
        this.scheduler = null
    }

    // True if it has user, false if user is empty
    isAnyUserRegistered() { 
        return hoyoRepository.hasUser()
    }
}