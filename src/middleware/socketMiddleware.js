export const SOCKET_CONN_MOUNT = "SOCKET_CONN_MOUNT";
/*
[] needs a means of interpreting presence socketmessages
[] needs a means of reducing presence socket messages
[] needs a means of communicating to server to broadcast socket closing events
[] server needs channel id and userId to send updated presence list to connected clients
[] case,  client communicates a closed connection via unmount
[] case, client receives members list from server, middleware adds active to objects before passing payload
[] case, another client unmounts board, sending client id and channel id to server, close presence broadcast to channel subscribers
[] case, another client mounts board, sending client id and channel id to server, open presence broadcast to channel subscribers
[] where should we handle adding data? should server reflect client event? socket_open=true/false
[] server has list of clients with ready status, can it cycle through and return all active?

*/
export const socketMiddleware = () => {
  let socket = { instance: null, exists: false };

  return (storeApi) => (next) => async (action) => {
    let entityId = null;
    let userId = null;
    switch (action.type) {
      case SOCKET_CONN_MOUNT:
        userId = action.payload.userId;
        entityId = action.payload.entityId;
        const socketURI = process.env.REACT_APP_DEV_BASE_SOCKET;

        socket.instance = new WebSocket(socketURI);
        socket.exists = true;
        socket.instance.onmessage = (e) => {
          let data = JSON.parse(e.data);

          let { socketPayload: socketAction, payload } = data;
          console.log("SA", socketAction, data);
          switch (socketAction) {
            case "SOCKET_CLOSE":
              storeApi.dispatch({ type: socketAction, payload: data });
              break;
            case "SOCKET_OPEN":
              storeApi.dispatch({ type: socketAction, payload: data });
              break;
            case "ADD_ITEM":
              storeApi.dispatch({ type: "ADD_ITEM_SUCCESS", payload: data });
              break;
            case "ADD_COLUMN":
              storeApi.dispatch({ type: "ADD_COL_SUCCESS", payload: data });
              break;
            default:
              storeApi.dispatch({ type: "SOCKET_MESSAGE", payload: e.data });
          }
        };

        socket.instance.onopen = (e) =>
          socket.instance.send(
            JSON.stringify({
              type: "SOCKET_OPEN",
              payload: { entityId, status: true, userId },
            })
          );

        // TODO: socket.onclose = something to note this action in our store
        break;
      case "SOCKET_CONN_UNMOUNT":
        entityId = action.payload.entityId;
        userId = action.payload.userId;

        if (socket.exists && socket.instance.readyState === 1) {
          storeApi.dispatch({ type: "RESET" });
          socket.instance.send(
            JSON.stringify({
              type: "SOCKET_CLOSE",
              payload: { entityId, userId, status: false },
            })
          );
          socket.instance.close();
        }
        break;
      default:
        next(action);
    }
  };
};
