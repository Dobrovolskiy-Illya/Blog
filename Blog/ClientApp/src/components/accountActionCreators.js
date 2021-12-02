import { LOGIN } from "./accountActions";


export function login(userName = '', JWTtoken = '') {

    return {
        type: LOGIN,
        userName: userName,
        JWTtoken: JWTtoken
    }
}