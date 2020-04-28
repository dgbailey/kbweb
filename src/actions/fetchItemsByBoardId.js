export const FETCH_BOARDITEMS_START = 'FETCH_BOARDITEMS_START';
export const FETCH_BOARDITEMS_SUCCESS = 'FETCH_BOARDITEMS_SUCCESS';
export const FETCH_BOARDITEMS_FAILURE = 'FETCH_BOARDITEMS_FAILURE';
const boardUri = process.env.REACT_APP_DEV_BASE_URI + '/boards/';
const items = '/items';

export const fetchItemsByBoardId = async (boardId, dispatch) => {
	const fullUri = boardUri + boardId + items;
	let settings = {
		method: 'GET',
		credentials: 'include'
	};
	try {
		dispatch({ type: FETCH_BOARDITEMS_START });
		let items = await fetch(fullUri, settings);
		let json = await items.json();
		dispatch({ type: FETCH_BOARDITEMS_SUCCESS, payload: json });
	} catch (error) {
		dispatch({ type: FETCH_BOARDITEMS_FAILURE, payload: error.message });
	}
};
