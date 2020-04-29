export const FETCH_BOARDCOLS_START = 'FETCH_BOARDCOLS_START';
export const FETCH_BOARDCOLS_SUCCESS = 'FETCH_BOARDCOLS_SUCCESS';
export const FETCH_BOARDCOLS_FAILURE = 'FETCH_BOARDCOLS_FAILURE';
const boardUri = process.env.REACT_APP_DEV_BASE_URI + '/boards/';
const columns = '/columns';

export const fetchColumnsByBoardId = async (boardId, dispatch) => {
	const fullUri = boardUri + boardId + columns;
	let settings = {
		method: 'GET',
		credentials: 'include'
	};
	try {
		dispatch({ type: FETCH_BOARDCOLS_START });
		let cols = await fetch(fullUri, settings);
		let json = await cols.json();
		dispatch({ type: FETCH_BOARDCOLS_SUCCESS, payload: json });
	} catch (error) {
		dispatch({ type: FETCH_BOARDCOLS_FAILURE, payload: error.message });
	}
};
