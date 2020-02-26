import {combineReducers} from 'redux';
import {boardReducer} from './boardReducer';
import {registrationReducer} from './registrationReducer';
import {loginReducer} from './loginReducer';
export const rootReducer =  combineReducers({
    
    board:boardReducer,
    registrationStatus:registrationReducer,
    loginStatus:loginReducer
    // loginStatus:loginReducer

})