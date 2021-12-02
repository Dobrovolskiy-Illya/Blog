import { LOGIN } from "./accountActions";




export function accountAutentification(state, action) {

    switch (action.type) {
        case LOGIN:
            return {
                userName: action.userName,
                JWTtoken: action.JWTtoken
            }
        default:
            return state
    }
}