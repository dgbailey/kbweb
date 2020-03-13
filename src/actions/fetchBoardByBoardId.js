export const FETCH_BOARD_START = 'FETCH_BOARD_START';
export const FETCH_BOARD_SUCCESS = 'FETCH_BOARD_SUCCESS';
export const FETCH_BOARD_FAILURE = 'FETCH_BOARD_FAILURE';
const boardUri = 'http://localhost:3000/boards/';

export const fetchBoardByBoardId = async (boardId, dispatch) => {
	const fullUri = boardUri + boardId;
	let settings = {
		method: 'POST',
		credentials: include
	};
	try {
		dispatch({ type: FETCH_BOARD_START });
		let board = await fetch(fullUri, settings);
		let json = board.json();
		dispatch({ type: FETCH_BOARD_SUCCESS, payload: json });
	} catch (error) {
		dispatch({ type: FETCH_BOARD_FAILURE, payload: error.message });
	}
};
