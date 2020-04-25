export const socketMiddleware = (socketURI) => {
	let socket;

	return (storeApi) => (next) => async (action) => {
		switch (action.type) {
			case 'SOCKET_CONN_MOUNT':
				let entityId = action.payload.entityId;
				socket = new WebSocket(socketURI);
				socket.onmessage = (e) => storeApi.dispatch({ type: 'SOCKET_MESSAGE', payload: e.data });
				socket.onopen = (e) => socket.send(entityId);
				// TODO: socket.onclose = something to note this action in our store
				break;
			case 'SOCKET_CONN_UNMOUNT':
				socket.close();
			default:
				next(action);
		}
	};
};
