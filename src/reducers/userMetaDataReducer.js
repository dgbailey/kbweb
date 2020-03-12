const initialState = {
	id: null,
	boardIds: [],
	userName: null,
	fetchStart: false,
	fetchSuccess: false,
	fetchFailure: false
};

const FETCHING_START_METADATA = 'FETCHING_USER_METADATA';
const FETCHING_SUCCESS_METADATA = 'FETCHING_SUCCESS_METADATA';
const FETCHING_FAILURE_METADATA = 'FETCHING_USER_METADATA';

export const userMetaDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_START_METADATA:
			return {
				...state,
				fetchStart: true
			};
		case FETCHING_SUCCESS_METADATA:
			return {
				...state,
				fetchStart: false,
				fetchSuccess: true,
				id: action.payload.userId,
				userName: action.payload.userName,
				boardIds: action.payload.metaData || []
			};
		case FETCHING_FAILURE_METADATA:
			return {
				...state,
				fetchStart: false,
				fetchSuccess: true,
				id: null,
				boardIds: [],
				fetchFailure: action.payload
			};
		default:
			return state;
	}
};
