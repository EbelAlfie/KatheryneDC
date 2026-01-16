export class LoginRequest { 
    constructor({email, password}) {
        this.email = email
        this.password = password
    }

    static fromTextField(emailField, passwordField) {
        return new LoginRequest(
            {
                email: emailField.value,
                password: passwordField.value
            }
        )
    }
}