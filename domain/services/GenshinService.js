import { BaseError } from "../model/Errors"

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
        try {
            const targetUser = this.userRepository.getUserById(discordId)
            const response = this.hoyoRepository.checkIn(targetUser.cookies)
            return response
        } catch(error) { 
            throw BaseError.fromErrorResponse(error)
        }    
    }
} 