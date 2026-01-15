import { JSEncrypt } from "nodejs-jsencrypt"

export function encryptWithPublicKey(args) {
    const { message, publicKey } = args
    const rsa = new JSEncrypt()
    rsa.setPublicKey(publicKey)
    let encrypted = rsa.encrypt(message)

    return encrypted 
}