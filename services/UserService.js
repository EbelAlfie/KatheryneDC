import { HoyolabRepository } from "../data/HoyolabRepository.js"
import { UserRepository } from "../data/UserRepository.js"

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
        const registerUserModel = await this.hoyoRepository.registerUser(userModel)
        this.userRepository.saveUser(registerUserModel, discordId)  
    }

    async login(discordId, cookies) {
        const key = "ltuid_v2="
        const regex = new RegExp(`(?:^|;\\s*)${key}([^;]+)`)
        const matches = cookies.match(regex)
        const uid = matches ? matches[1] : ""
        const userGameRecord = await this.hoyoRepository.getGameRecord(uid, cookies)
        await this.userRepository.saveUserCookie(discordId, cookies, userGameRecord)
        return userGameRecord
    }
}