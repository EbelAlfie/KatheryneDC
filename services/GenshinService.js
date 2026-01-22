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

    async checkInByUser(discordId) {
        const targetUser = this.userRepository.getUserById(discordId)
        const response = await this.hoyoRepository.checkIn(targetUser.cookies)
        return { targetUser, response }
    }

    async redeemCode(code, discordId) { 
        const targetUser = this.userRepository.getUserById(discordId)
        const response = await this.hoyoRepository.redeemCode(code, targetUser)
        return { targetUser, response }
    }
} 