import { HoyoResponseCode } from "../../domain/model/StatusCode.js"

export class HoyoResponseError extends Error { 
    constructor(retcode, message) {
        super(message ?? "Unknown Error")
        this.retcode = retcode ?? HoyoResponseCode.UnknownError
        this.message = message ?? "Unknown Error"
    }

    static createErrorByResponse(response) {
        const {
            retcode = HoyoResponseCode.UnknownError, 
            message = ""
        } = response

        const error = new HoyoResponseError(retcode, message)
        return error
    }
}