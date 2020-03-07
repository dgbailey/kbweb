import { queryStringGenerator } from '../utilities/queryStringGenerator';
export const ADD_COL_START = 'ADD_COL_START';
export const ADD_COL_SUCCESS = 'ADD_COL_SUCCESS';
export const ADD_COL_FAILURE = 'ADD_COL_FAILURE';

const addColUri = process.env.REACT_APP_DEV_BASE_URI + '/columns';

export const addColumn = async (colObject, dispatch) => {
	let boardId = window.localStorage.getItem('ab');
	const fetchUri = queryStringGenerator(addColUri, { ...colObject, boardId });
	let metaData = {
		method: 'POST',
		headers: {
			'Content-Type': 'application-json'
		},
		credentials: 'include'
	};
	try {
		dispatch({ type: ADD_COL_START });
		let column = await fetch(fetchUri, metaData);
		let json = await column.json();
		dispatch({ type: ADD_COL_SUCCESS, payload: json });
	} catch (error) {
        console.log('err',error)
		dispatch({ type: ADD_COL_FAILURE, payload: error });
	}
};
