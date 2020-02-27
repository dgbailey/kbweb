import {combineReducers} from 'redux';
import {boardReducer} from './boardReducer';
import {registrationReducer} from './registrationReducer';
import {loginReducer} from './loginReducer';
import {userMetaDataReducer} from './userMetaDataReducer';

export const rootReducer =  combineReducers({
    
    board:boardReducer,
    registrationStatus:registrationReducer,
    loginStatus:loginReducer,
    userMetaData:userMetaDataReducer
    // loginStatus:loginReducer

})