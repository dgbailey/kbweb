export const lastWriterWins = (storageManager = {}) => {
	let pendingEdits = storageManager;

	return (storeAPI) => (next) => (action) => {
		//this only worries about receiving socket messages
		let fromSocket = action.type.match(/[ADD_]+|[SOCKET_MESSAGE]+/);

		let entityId = action.payload.entityId; //this could be a problem with current schema
		//is this a socket based action?
		switch (fromSocket) {
			case 'ADD_':
				//clear or add edits pending server confirmation
				pendingEdits[entityId] ? delete pendingEdits[entityId] : (pendingEdits[entityId] = true);

			case 'SOCKET_MESSAGE':
				//Ignore incoming socket edits if they match any entries still pending server confirmation

				let isEditSpecificMessage = typeof action.payload.entityId === 'string' ? true : false;
				//Check if message is entity specific
				if (isEditSpecificMessage) {
					!pendingEdits[entityId] && next(action);
				} else {
					next(action);
				}
		}
	};
};
