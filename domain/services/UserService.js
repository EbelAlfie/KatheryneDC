import { HoyolabRepository } from "../../data/HoyolabRepository.js"
import { UserRepository } from "../../data/UserRepository.js"
import { BaseError } from "../model/Errors.js"

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
            const registerUserModel = await this.hoyoRepository.registerUser(userModel)
            
            this.userRepository.saveUser(registerUserModel, discordId)
        } 
        catch(error) {

        }    
    }

    async login(discordId, cookies) {
        try { 
            const key = "ltuid_v2="
            const regex = new RegExp(`(?:^|;\\s*)${key}([^;]+)`)
            const matches = cookies.match(regex)
            const uid = matches[1]

            const userGameRecord = await this.hoyoRepository.getGameRecord(uid, cookies)
            
            this.#saveCookie(discordId, cookies, userGameRecord)
        } catch (error) {
            console.log(error)
            throw BaseError.fromErrorResponse(error)
        }
    }

    #saveCookie(discordId, cookies, userGameRecord) {
        this.userRepository.saveUserCookie(discordId, cookies, userGameRecord)
    }
}