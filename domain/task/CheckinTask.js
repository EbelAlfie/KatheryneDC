import { getTomorrow } from "../../presentation/utils.js";

export class CheckInTask {
    hoyoRepository = null
    localApi = null
    
    constructor(config) {
        const {
            hoyoRepository,
            localApi
        } = config
        this.hoyoRepository = hoyoRepository
        this.localApi = localApi
    }

    run(task) {
        this.hoyoRepository.checkInAllUser()
        this.localApi.removeTask(task)
        this.localApi.addTask(
            newTask(
                task.userModel,
                task.type,
                //Date() jam 1 
            )
        )
    }

    calculateNextExec() {
        const tomorrow = getTomorrow(new Date())
        tomorrow.setHours(1)
        return tomorrow
    }
}