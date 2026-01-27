import 'dotenv/config'
import { env } from 'node:process'
import { ApiClient } from "./source/api.js"
import { encryptWithPublicKey } from "./util.js"
import { DailyNote } from '../domain/model/DailyNote.js'
import { BaseError, UidNotFoundError } from '../domain/error/Errors.js'
import { UserGameRecord } from '../domain/model/UserGameRecord.js'

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
            console.log(`checkin error ${error}`)
            throw BaseError.fromErrorResponse(error)
        }
    }

    async redeemCode(code, userModel) { 
        try { 
            const genshinId = userModel.getGenshinRoleId()
            const server = userModel.getServerRegion()
            const cookies = userModel.cookies

            let response = await this.apiClient.redeemCode(
                {
                    genshinId: genshinId,
                    server: server,
                    code: code
                }, 
                cookies
            )
            return response
        } catch (error) { 
            throw BaseError.fromErrorResponse(error)
        }
    }

    async getDailyNote(userModel) {
        try {
            const genshinId = userModel.getGenshinRoleId()
            const server = userModel.getServerRegion()
            const cookies = userModel.cookies

            const requestModel = {
                genshinId: genshinId,
                server: server
            }
            let response = await this.apiClient.getDailyNote(requestModel, cookies)
            return DailyNote.fromResponse(response)
        } catch(error) {
            console.log(`Daily error ${error}`)
            throw BaseError.fromErrorResponse(error)
        }
    }

    async getGameRecord(uid, cookie) {
        try {
            let response = await this.apiClient.getGameRecord(uid, cookie)
            return UserGameRecord.fromResponse(response)
        } catch (error) { 
            console.log(error)
            throw BaseError.fromErrorResponse(error)
        }
    }
}