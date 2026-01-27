import type ValidationErrors from "./ValidationError"

export default interface AuthError {
    status: number,
    errors: ValidationErrors
}