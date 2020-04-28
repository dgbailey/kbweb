import { FETCHING_SUCCESS_METADATA } from '../actions/preflightAuthStatus';
export const loginUri = 'https://robodexer.herokuapp.com/flow/login';
export const FETCH_LOGIN_START = 'FETCH_LOGIN_START';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';

export const loginCredentialsAction = async (creds, dispatch) => {
	try {
		//remember 400/500 are responses not network errors.  You still need to check if the response is good
		dispatch({ type: FETCH_LOGIN_START });
		let settings = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(creds),
			credentials: 'include'
		};

		let response = await fetch(loginUri, settings);
		let jsonResolved = await response.json();

		if (response.status === 200) {
			dispatch({ type: FETCH_LOGIN_SUCCESS });
			dispatch({ type: FETCHING_SUCCESS_METADATA, payload: jsonResolved });
		} else {
			throw new Error(jsonResolved);
		}
	} catch (err) {
		dispatch({ type: FETCH_LOGIN_FAILURE, payload: err.toString() });
	}
};
