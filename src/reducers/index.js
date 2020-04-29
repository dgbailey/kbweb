import { combineReducers } from 'redux';
import { registrationReducer } from './registrationReducer';
import { loginReducer } from './loginReducer';
import { userMetaDataReducer } from './userMetaDataReducer';
import { expBoardReducer } from './boardReducer';
import { boardMembersReducer } from './boardMembersReducer';
export const rootReducer = combineReducers({
	registrationStatus: registrationReducer,
	loginStatus: loginReducer,
	userMetaData: userMetaDataReducer,
	expBoard: expBoardReducer,
	addMemberStatus: boardMembersReducer
});
