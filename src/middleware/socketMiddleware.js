export const socketMiddleware = (socketURI) => {
	let socket;

	return (storeApi) => (next) => (action) => {
		switch (action.type) {
			case 'SOCKET_CONN_MOUNT':
				let entitySpecificUri = socketURI + action.payload.entityId;
				socket = new WebSocket(entitySpecificUri);
				socket.onmessage = (e) => storeApi.dispatch({ type: 'SOCKET_MESSAGE', payload: e.data });
				socket.onclose = storeApi.dispatch({ type: 'SOCKET_MESSAGE', payload: 'socket closed' });
				break;
			case 'SOCKET_CONN_UNMOUNT':
				socket.send(action.payload);
				socket.close();
		}
		console.log('logging next');
		return next(action);
	};
};
