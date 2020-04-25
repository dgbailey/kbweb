import {
	ADD_BOARD_MEMBER_START,
	ADD_BOARD_MEMBER_SUCCESS,
	ADD_BOARD_MEMBER_FAILURE
} from '../actions/addMemberToBoard';

const boardMemberState = {
	addMemberStart: false,
	addMemberSuccess: false,
	addMemberFailure: false
};
export const boardMembersReducer = (initialState = boardMemberState, action) => {
	switch (action.type) {
		case 'ADD_BOARD_MEMBER_START':
			return {
				...initialState,
				addMemberStart: true,
				addMemberStart: false,
				addMemberFailure: false
			};
		case 'ADD_BOARD_MEMBER_SUCCESS':
			return {
				...initialState,
				addMemberSuccess: true,
				addMemberStart: false
			};
		case 'ADD_BOARD_MEMBER_FAILURE':
			return {
				...initialState,
				addMemberSuccess: true,
				addMemberStart: false
			};
		default:
			return initialState;
	}
};
