import 'dotenv/config'
import { env } from 'node:process'
import { ApiClient, checkIn, getDailyNote, login } from "./source/api.js"
import { encryptWithPublicKey } from "./util.js"
import { DailyNote } from '../domain/model/DailyNote.js'
import { BaseError } from '../domain/model/Errors.js'

export class HoyolabRepository {

    apiClient = new ApiClient()

    async registerUser(user) {
        try {
            const publicKey = env.MIHOYO_ENCRYPTION_KEY
            const encryptedEmail = encryptWithPublicKey({
                message: user.email,
                publicKey: publicKey
            })

            const encryptedPass = encryptWithPublicKey({
                message: user.password,
                publicKey: publicKey
            })

            let newRequest = {
                account: encryptedEmail||"",
                password: encryptedPass||"",
                tokenType: 2
            }
            
            let response = await this.apiClient.login(newRequest)
            return response
        } catch(error) {
            throw BaseError.fromErrorResponse(error)
        }
    }

    async checkIn(cookie) {
        try {
            let response = await this.apiClient.checkIn(cookie)
            return response
        } catch(error) {
            throw BaseError.fromErrorResponse(error)
        }
    }

    async getDailyNote() {
        try {
            let response = await this.apiClient.getDailyNote()
            return DailyNote.fromResponse(response)
        } catch(error) {
            throw BaseError.fromErrorResponse(error)
        }
    }
}