export const parallelRequests = async (...requests) => {
	try {
		await Promise.all(requests);
	} catch (error) {
		//this many never catch due to the fact that our args are actions that handle their own promises
		console.log('Parallel request failure:', error.message);
	}
};
