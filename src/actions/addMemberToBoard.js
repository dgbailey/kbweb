const ADD_BOARD_MEMBER_START = 'ADD_BOARD_MEMBER_START';
const ADD_BOARD_MEMBER_SUCCESS = 'ADD_BOARD_MEMBER_SUCCESS';
const ADD_BOARD_MEMBER_FAILURE = 'ADD_BOARD_MEMBER_FAILURE';
const boardUri = 'http://localhost:8080/boards/:boardId/members';
const queryStringGenerator = require('../utilities/queryStringGenerator');

export const addMemberToBoard = async (userName, boardId, dispatch) => {
	let queryString = queryStringGenerator(boardUri, { userName });
	let formattedURI = boardUri.replace(/:boardId/, boardId) + queryString;
	let metaData = {
		method: 'POST',
		headers: {
			'Content-Type': 'application-json'
		},
		credentials: 'include'
	};
	try {
		dispatch({ type: ADD_BOARD_MEMBER_START });
		await fetch(formattedURI, metaData);
		dispatch({ type: ADD_BOARD_MEMBER_SUCCESS });
	} catch (error) {
		dispatch({ type: ADD_BOARD_MEMBER_FAILURE, payload: error });
	}
};
