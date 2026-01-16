import { HoyolabRepository } from "../../data/HoyolabRepository.js"
import { UserRepository } from "../../data/UserRepository.js"

export class UserService {
    hoyoRepository
    userRepository

    constructor(config) {
        const {
            hoyoRepository = new HoyolabRepository(),
            userRepository = new UserRepository()
        } = config
        this.hoyoRepository = hoyoRepository
        this.userRepository = userRepository
    }

    async registerUser(discordId, userModel) {
        if (this.userRepository.isUserRegistered(discordId)) {

        }
        try {
            const response = await this.hoyoRepository.registerUser(userModel)
            
            this.userRepository.saveUser(response, discordId)
        } 
        catch(error) {

        }    
    }

    async login(discordId, cookies) {
        this.saveCookie(discordId, cookies)
    }

    saveCookie(discordId, cookies) {
        this.userRepository.saveUserCookie(discordId, cookies)
    }
}