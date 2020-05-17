export const SOCKET_CONN_MOUNT = 'SOCKET_CONN_MOUNT';
export const socketMiddleware = () => {
	let socket;

	return (storeApi) => (next) => async (action) => {
		switch (action.type) {
			case SOCKET_CONN_MOUNT:
				const socketURI = process.env.REACT_APP_DEV_BASE_SOCKET;
				let entityId = action.payload.entityId;
				socket = new WebSocket(socketURI);
				socket.onmessage = (e) => {
					let data = JSON.parse(e.data);

					let { socketPayload: socketAction } = data;
					switch (socketAction) {
						case 'ADD_ITEM':
							storeApi.dispatch({ type: 'ADD_ITEM_SUCCESS', payload: data });
							break;
						case 'ADD_COLUMN':
							storeApi.dispatch({ type: 'ADD_COL_SUCCESS', payload: data });
							break;
						default:
							storeApi.dispatch({ type: 'SOCKET_MESSAGE', payload: e.data });
					}
				};

				socket.onopen = (e) => socket.send(entityId);
				// TODO: socket.onclose = something to note this action in our store
				break;
			case 'SOCKET_CONN_UNMOUNT':
				if (socket && socket.readyStatus === 1) {
					socket.close();
				}
				break;
			default:
				next(action);
		}
	};
};
