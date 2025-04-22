import { NoUserError, ResponseSuccess } from "../domain/CheckInResCode.js"
import onlineApi from "./source/api.js"
import localApi from "./source/local.js"

class HoyolabRepository {
    constructor() {}

    /** Public */
    async registerUser(userModel) {
        if (localApi.existingUser(userModel.email)) 
            Promise.reject("User already exist")

        return onlineApi.login(userModel)
            .then(response => {
                this.#saveUserToLocal(response, userModel.email)
            })
    }

    hasUser() {
        return !localApi.isUserListEmpty()
    }

    checkInAllUser(callback) {
        let userData = localApi.allUsers()
        userData.forEach(item => {
            onlineApi.checkIn(item.join("; "))
            .then(result => callback.onSuccess(result))
            .catch(error => callback.onError(error))
        })
    }

    /** Privates */
    #saveUserToLocal(result, email) {
        const {
            retcode = 0,
            headers = {},
        } = result.data ?? {}

        switch(retcode) {
            case ResponseSuccess : {
                console.log(headers)
                let cookies = headers.get("set-cookie")
                if (cookies !== undefined) {
                    localApi.storeUser(email, cookies)
                    Promise.resolve()
                } else 
                    Promise.reject("No cookie :(")
                break
            }
            default: 
                Promise.reject(result.message)
        }
    }
}

export const hoyoRepository = new HoyolabRepository()