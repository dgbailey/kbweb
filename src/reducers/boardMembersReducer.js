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
export const boardMembersReducer = (boardMemberState, action) => {
	switch (action.type) {
		case 'ADD_BOARD_MEMBER_START':
			return {
				...state,
				addMemberStart: true,
				addMemberStart: false,
				addMemberFailure: false
			};
		case 'ADD_BOARD_MEMBER_SUCCESS':
			return {
				...state,
				addMemberSuccess: true,
				addMemberStart: false
			};
		case 'ADD_BOARD_MEMBER_FAILURE':
			return {
				...state,
				addMemberSuccess: true,
				addMemberStart: false
			};
		default:
			return state;
	}
};
