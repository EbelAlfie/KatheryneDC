export class GenshinService {
    userRepository
    hoyoRepository
    taskRepository

    constructor(config) {
        const {
            userRepository,
            hoyoRepository,
            taskRepository
        } = config
        this.userRepository = userRepository
        this.hoyoRepository = hoyoRepository
        this.taskRepository = taskRepository
    }
} 