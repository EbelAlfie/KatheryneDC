import { HoyoResponseCode, StatusCodes } from "./StatusCode.js"

export function createHoyoError(response) {
    const {
        retcode = StatusCodes.UnknownError, 
        message = ""
    } = response

    const errorMessages = {
        [StatusCodes.UnknownError]: "Yahh, checkin gagal :(",
        [HoyoResponseCode.AlreadyCheckIn]: "Sudah checkin hari ini",
        [HoyoResponseCode.NotLoggedIn]: "Belum log in",
    }

    const error = new Error(errorMessages)
    error.retcode = retcode

    return error
}