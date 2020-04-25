import { combineReducers } from 'redux';
import { boardReducer } from './boardReducer';
import { registrationReducer } from './registrationReducer';
import { loginReducer } from './loginReducer';
import { userMetaDataReducer } from './userMetaDataReducer';
import { expBoardReducer } from './boardReducer';
import { boardMemberReducer } from './boardMembersReducer';
export const rootReducer = combineReducers({
	registrationStatus: registrationReducer,
	loginStatus: loginReducer,
	userMetaData: userMetaDataReducer,
	expBoard: expBoardReducer,
	addMemberStatus: boardMemberReducer
});
