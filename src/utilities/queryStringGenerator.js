export function queryStringGenerator(baseUri, queryStringObject) {
	//this should probably sanitize
	let newUri = baseUri + '?';
	for (let k of Object.keys(queryStringObject)) {
		let addition = k + '=' + queryStringObject[k] + '&';
		newUri = newUri + addition;
	}
	console.log('UTIL', queryStringObject);
	return newUri.slice(0, newUri.length - 1);
}
