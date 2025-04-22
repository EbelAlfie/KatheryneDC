import { checkIn, login } from "./service.js"
import 'dotenv/config'
import { env } from 'node:process'
import { encryptWithPublicKey } from "../util.js"
import { ResponseSuccess, UnknownError } from "../../domain/CheckInResCode.js"

class Api {
    key = null

    constructor() {
        this.#initApi()
    }

    #initApi() {}

    async checkIn(cookie) {
        return checkIn(cookie)
        .then(response => {
            console.log(response.data)
            let body = response.data
            return {
                data: body?.data ?? null,
                message: body?.message ?? "",
                retcode: body?.retcode ?? null
            }
        })
    }

    async login(user) {
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
            .then(response => { //maping response
                let body = response.data
                let result = {
                    data: body?.data ?? null,
                    message: body?.message ?? "",
                    retcode: body?.retcode ?? UnknownError,
                    headers: response?.headers
                }
                if (result.retcode == ResponseSuccess) return result
                else throw Error(result.message)
            })
    }

}

const onlineApi = new Api()
export default onlineApi 