import { hoyoRepository } from "../../data/HoyolabRepository.js"
import localApi from "../../data/source/local.js"
import { newTask, TaskType } from "../../domain/Task.js"

export class CheckInScheduler {
    discordClient = null 
    timerId = "check_in"
    scheduler = null

    setClient(client) { 
        this.discordClient = client
    }

    /** Public */
    startReminder() {
        if (this.scheduler) return 

        this.scheduler = setInterval(async () => {
            const dueTasks = localApi.getTask()
            
            for (task in dueTasks) {

                switch (task.type) {
                    case TaskType.CHECK_IN:
                        hoyoRepository.checkInAllUser()
                        localApi.removeTask(task)
                        localApi.addTask(
                            newTask(
                                task.userModel,
                                task.type,
                                //Date() jam 1 
                            )
                        )
                    default:
                        break;
                }
            }
        }, 3600000)
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