import nodeCron from "node-cron"
import { CheckInTask } from "../task/CheckinTask.js"
import { TaskType } from "../../domain/model/Task.js"
import { DailyTask } from "../task/DailyTask.js"

export class MainScheduler {
    discordClient
    hoyoRepository
    taskRepository
    checkin
    daily
    
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
        this.daily = new DailyTask(config)
    }

    /** Public */
    start() {
        if (this.scheduler || !this.discordClient) return 

        this.scheduler = nodeCron.schedule("0 * * * * *",
            async () => {
                const dueTasks = this.taskRepository.getTask()
                console.log(`Due Task ${dueTasks}`)
                dueTasks?.forEach(task => {
                    this.#processTask(task)
                })
            }
        )
    }

    #processTask(task) {
        switch (task.type) {
            case TaskType.CHECK_IN:
                this.checkin.run(task, this.discordClient)
            case TaskType.DAILY:
                this.daily.run(task, this.discordClient)
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