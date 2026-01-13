import { HoyoResponseCode } from "./HoyoResponseCodes.js"

export function createHoyoError(response) {
    const {
        retcode = HoyoResponseCode.UnknownError, 
        message = ""
    } = response

    const errorMessages = {
        [HoyoResponseCode.UnknownError]: "Yahh, checkin gagal :(",
        [HoyoResponseCode.AlreadyCheckIn]: "Sudah checkin hari ini",
        [HoyoResponseCode.NoUserError]: "Ga ada user",
        [HoyoResponseCode.NotLoggedIn]: "Belum log in",
    }

    const error = new Error(errorMessages)
    error.retcode = retcode

    return error
}