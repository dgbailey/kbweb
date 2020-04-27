import { queryStringGenerator } from '../utilities/queryStringGenerator';
export const ADD_ITEM_START = 'ADD_ITEM_START';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';
const actionPrefix = 'ADD_ITEM';
const addItemUri = process.env.REACT_APP_DEV_BASE_URI + '/items';

export const addItem = async (itemObject, dispatch) => {
	const { itemContent, relationId } = itemObject;
	const socketAction = actionPrefix;

	const fetchUri = queryStringGenerator(addItemUri, { ...relationId, itemContent, socketAction });
	const metaData = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	};
	try {
		dispatch({ type: ADD_ITEM_START });
		let item = await fetch(fetchUri, metaData);
		let json = await item.json();
		dispatch({ type: ADD_ITEM_SUCCESS, payload: json });
	} catch (error) {
		dispatch({ type: ADD_ITEM_FAILURE, payload: error });
	}
};
