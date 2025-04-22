import { JSEncrypt } from "nodejs-jsencrypt"

export function encryptWithPublicKey(args) {
    const { message, publicKey } = args
    const rsa = new JSEncrypt()
    rsa.setPublicKey(publicKey)
    let encrypted = rsa.encrypt(message)

    return encrypted 
}

export function mapResponseBody(response) {
    let body = response.data
    let result = {
        data: body?.data ?? null,
        message: body?.message ?? "",
        retcode: body?.retcode ?? UnknownError
    }
    if (result.retcode == ResponseSuccess) return result
    else throw Error(result)
}