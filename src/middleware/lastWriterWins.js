export const lastWriterWins = (storageManager = {}) => {
	let pendingEdits = storageManager;

	return (storeAPI) => (next) => (action) => {
		let fromSocket = action.type.match(/SOCKET_/)[0];
		let entityId = action.payload.entityId; //this could be a problem with current schema
		//is this a socket based action?
		switch (fromSocket) {
			case null:
				//from server outgoing or inbound
				pendingEdits[entityId] ? delete pendingEdits[entityId] : (pendingEdits[entityId] = true);

			case 'SOCKET_':
				//Ignore incoming socket edits if they match any entries pending server success confirmation
				!pendingEdits[entityId] && next(action);
		}
	};
};
