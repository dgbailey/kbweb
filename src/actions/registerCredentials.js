const registrationURI = 'http://localhost:8080/flow/signup';
export const registerCredentialsAction = async (creds, dispatch) => {
	try {
		//remember 400/500 are responses not network errors.  You still need to check if the response is good
		dispatch({ type: 'START_REGISTRATION' });
		let settings = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(creds),
			credentials: 'include'
		};

		let response = await fetch(registrationURI, settings);
		let responseResolved = await response.json();
		let { jwt, userName, userId } = responseResolved;

		if (response.status === 200) {
			dispatch({ type: 'REGISTRATION_COMPLETE' });
			window.localStorage.setItem('kbt', responseResolved);
			//needthis in local storage for now in order to push
			dispatch({ type: 'FETCHING_SUCCESS_METADATA', payload: { userId, userName } });
		} else {
			throw new Error(responseResolved);
		}
	} catch (err) {
		dispatch({ type: 'REGISTRATION_ERROR', payload: err.toString() });
	}
};
