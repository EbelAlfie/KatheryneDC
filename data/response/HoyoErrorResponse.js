import { HoyoResponseCode } from "../../domain/model/StatusCode"

export class HoyoResponseError extends Error { 
    constructor(retcode, message) {
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