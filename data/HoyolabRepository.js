import 'dotenv/config'
import { env } from 'node:process'
import { checkIn, login } from "./source/api.js"
import { encryptWithPublicKey } from "./util.js"
import { createHoyoError } from "../domain/model/Errors.js"
import { StatusCodes, HoyoResponseCode } from "../domain/model/StatusCode.js"

export class HoyolabRepository {
    async registerUser(user) {
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
        
        return login(newRequest)
            .then(response => {
                const body = response.data
                const result = {
                    data: body?.data ?? null,
                    message: body?.message ?? "",
                    retcode: body?.retcode ?? StatusCodes.UnknownError,
                    headers: response?.headers
                }
                console.log(result)
                if (result.retcode == HoyoResponseCode.ResponseSuccess) return result
                else throw createHoyoError(body)
            })
    }

    async checkIn(cookie) {
        return checkIn(cookie)
        .then(response => {
            console.log(response.data)
            const body = response.data
            const result = {
                data: body?.data ?? null,
                message: body?.message ?? "",
                retcode: body?.retcode ?? null
            }
            if (result.retcode == HoyoResponseCode.ResponseSuccess) return result
            else throw createHoyoError(body)
        })
    }
}