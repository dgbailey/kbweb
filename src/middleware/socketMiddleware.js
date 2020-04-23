export const socketMiddleware = (socketURI) => {
	let socket;

	return (storeApi) => (next) => (action) => {
		switch (action.type) {
			case 'SOCKET_CONN_MOUNT':
				let entityId = action.payload.entityId;
				socket = new WebSocket(socketURI);
				socket.onmessage = (e) => storeApi.dispatch({ type: 'SOCKET_MESSAGE', payload: e.data });
				socket.onopen = (e) => socket.send(entityId);
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
