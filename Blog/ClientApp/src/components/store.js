import { createStore } from 'redux';
import { accountAutentification } from './accountAutentification';


const initialState = {
    userName: '',
    JWTtoken: ''
}

const store = createStore(accountAutentification, initialState)


export default store