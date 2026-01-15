import { HoyoResponseCode, StatusCodes } from "./StatusCode.js"

export class BaseError {
    constructor(retcode, message) {
        this.retcode = retcode ?? StatusCodes.UnknownError
        this.message = message ?? "Unknown Error"
    }

    static fromErrorResponse(responseError) {
        switch(responseError.retcode) {
            case HoyoResponseCode.AlreadyCheckIn:
                return AlreadyCheckInError("Kamu sudah check in hari ini")
            case HoyoResponseCode.NotLoggedIn:
                return NotLoggedInError("Kamu belum log in")
            default:
                return UnknownError("Unknown Error")
        }
    }
}

export class UnknownError extends BaseError { 
    constructor(message) { super(StatusCodes.UnknownError, this.message = message) }
}

export class AlreadyCheckInError extends BaseError { 
    constructor(message) { super(StatusCodes.AlreadyCheckIn, this.message = message) }
}

export class NotLoggedInError extends BaseError { 
    constructor(message) { super(StatusCodes.NotLoggedIn, this.message = message) }
}