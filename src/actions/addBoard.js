import { queryStringGenerator } from '../utilities/queryStringGenerator';
export const ADD_BOARD_SUCCESS = 'ADD_BOARD_SUCCESS';
export const ADD_BOARD_START = 'ADD_BOARD_START';
export const ADD_BOARD_FAILURE = 'ADD_BOARD_FAILURE';
const boardUri = process.env.REACT_APP_DEV_BASE_URI + '/boards';

export const addBoard = async (boardObject, dispatch) => {
	const fetchUri = queryStringGenerator(boardUri, boardObject);
	const metaData = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	};
	try {
		dispatch({ type: ADD_BOARD_START });
        let board = await fetch(fetchUri, metaData);
        let json = await board.json();
        window.localStorage.setItem('ab',json.board_id);
		dispatch({ type: ADD_BOARD_SUCCESS, payload: json });
	} catch (error) {
		dispatch({ type: ADD_BOARD_FAILURE, payload: error });
	}
};
