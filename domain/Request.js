export function loginRequest(email, password) {
    return {
        email: email.value,
        password: password.value
    }
}