export const PREFLIGHT_AUTH_URL = 'http://localhost:8080/flow/login/preflight';
export const FETCHING_START_METADATA = 'FETCHING_USER_METADATA';
export const FETCHING_SUCCESS_METADATA = 'FETCHING_SUCCESS_METADATA';
export const FETCHING_FAILURE_METADATA = 'FETCHING_USER_METADATA';

export const preFlightAuthStatus = async (dispatch, history) => {
	try {
		dispatch({ type: FETCHING_START_METADATA });
		let settings = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
		};

		let response = await fetch(PREFLIGHT_AUTH_URL, settings);
		let jsonResolved = await response.json();
		if (response.status === 200) {
			//designed to only handle one board name
			let { board_id: boardId, name } = jsonResolved;
			dispatch({ type: FETCHING_SUCCESS_METADATA, payload: jsonResolved });
			history.push(`/home`);
		} else {
			throw new Error(jsonResolved);
		}
	} catch (err) {
		dispatch({ type: FETCHING_FAILURE_METADATA, payload: err.message });
	}
};
