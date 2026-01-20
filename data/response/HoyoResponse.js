import { HoyoResponseCode } from "../../domain/error/StatusCode.js"

export class HoyoResponse {
    data
    message
    retcode
    headers

    constructor({data, message, retcode, headers}) { 
        this.data = data ?? {}
        this.message = message ?? ""
        this.retcode = retcode ?? HoyoResponseCode.UnknownError
        this.headers = headers ?? []
    }

    isSuccess() { return this.retcode === HoyoResponseCode.ResponseSuccess }

    static transformWithHeader(body, headers) {
        return new HoyoResponse(
            {
                data: body?.data ?? null,
                message: body?.message ?? "",
                retcode: body?.retcode ?? HoyoResponseCode.UnknownError,
                headers: headers ?? {}
            }
        )
    }

    static transform(axiosResponse) {
        const body = axiosResponse?.data ?? {}
        return new HoyoResponse(
            {
                data: body?.data ?? null,
                message: body?.message ?? "",
                retcode: body?.retcode ?? HoyoResponseCode.UnknownError
            }
        )
    }

}