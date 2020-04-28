import { queryStringGenerator } from '../utilities/queryStringGenerator';
const ADD_BOARD_MEMBER_START = 'ADD_BOARD_MEMBER_START';
const ADD_BOARD_MEMBER_SUCCESS = 'ADD_BOARD_MEMBER_SUCCESS';
const ADD_BOARD_MEMBER_FAILURE = 'ADD_BOARD_MEMBER_FAILURE';
const boardUri = process.env.REACT_APP_DEV_BASE_URI + '/boards/boardId/members';

export const addMemberToBoard = async (userName, boardId, dispatch) => {
	let formattedURI = boardUri.replace(/boardId/, boardId);
	let queryString = queryStringGenerator(formattedURI, { userName });

	let metaData = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application-json'
		},
		credentials: 'include'
	};
	try {
		dispatch({ type: ADD_BOARD_MEMBER_START });
		await fetch(queryString, metaData);
		dispatch({ type: ADD_BOARD_MEMBER_SUCCESS });
	} catch (error) {
		dispatch({ type: ADD_BOARD_MEMBER_FAILURE, payload: error });
	}
};
