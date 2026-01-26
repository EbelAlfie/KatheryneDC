import { HoyoResponseCode, StatusCodes } from "./StatusCode.js"

export class BaseError extends Error {
    constructor(retcode, message) {
        super(message ?? "Unknown Error")
        this.retcode = retcode ?? StatusCodes.UnknownError
    }

    static fromErrorResponse(responseError) {
        switch(responseError.retcode) {
            case HoyoResponseCode.AlreadyCheckIn:
                return new AlreadyCheckInError(responseError.message)
            case HoyoResponseCode.NotLoggedIn:
                return new NotLoggedInError(responseError.message)
            case HoyoResponseCode.PleaseLogin:
                return new NotLoggedInError(responseError.message)
            default:
                return new UnknownError(responseError.message)
        }
    }
}

export class UnknownError extends BaseError { 
    constructor(message) { super(StatusCodes.UnknownError, message) }
}

export class AlreadyCheckInError extends BaseError { 
    constructor(message) { super(StatusCodes.AlreadyCheckIn, message) }
}

export class NotLoggedInError extends BaseError { 
    constructor(message) { super(StatusCodes.NotLoggedIn, message) }
}

export class UidNotFoundError extends BaseError { 
    constructor(message) { super(StatusCodes.NotLoggedIn, message) }
}

export class UserNotFoundError extends BaseError { 
    constructor(message) { super(StatusCodes.NotLoggedIn, message) }
}

export class InsertError extends BaseError { 
    constructor(message) { super(StatusCodes.NotLoggedIn, message) }
}