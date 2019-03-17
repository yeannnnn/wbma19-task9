export interface User {
    user_id?: number,
    username: string,
    password?: string,
    email?: string,
    full_name?: string,
    date_created?: Date,
}
export interface logInResponse {
    message: string,
    token: string,
    user: string,
}
export interface registerResponse {
    message: string,
    user_id: number,
}
export interface checkResponse {
    result?: object,
    username: string,
    available: Boolean,
}