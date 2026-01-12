import nodeCron from "node-cron"
import { hoyoRepository } from "../../data/HoyolabRepository.js"
import localApi from "../../data/source/local.js"
import { CheckInTask } from "../../domain/task/CheckinTask.js"
import { newTask, TaskType } from "../../domain/task/Task.js"

export class MainScheduler {
    discordClient = null 
    hoyoRepository = null
    checkin = null
    
    scheduler = null

    init(config) {
        const {
            hoyoRepository,
            discordClient
        } = config
        this.discordClient = discordClient
        this.hoyoRepository = hoyoRepository

        this.checkin = new CheckInTask(config)
    }

    /** Public */
    start() {
        if (this.scheduler || !this.discordClient) return 

        this.scheduler = nodeCron.schedule("0 * * * * *",
            () => {
                const dueTasks = localApi.getTask()
                
                for (const task of dueTasks) {
                    this.#processTask(task)
                }
            }
        ) 
    }

    #processTask(task) {
        switch (task.type) {
            case TaskType.CHECK_IN:
                this.checkin.run(task)
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