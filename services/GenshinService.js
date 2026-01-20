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

    checkInByUser(discordId) {
        const targetUser = this.userRepository.getUserById(discordId)
        const response = this.hoyoRepository.checkIn(targetUser.cookies)
        return { targetUser, response }
    }
} 