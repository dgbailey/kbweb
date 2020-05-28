export const SOCKET_CONN_MOUNT = "SOCKET_CONN_MOUNT";

export const socketMiddleware = () => {
  let socket = { instance: null, exists: false };

  return (storeApi) => (next) => async (action) => {
    let entityId;
    let userId;
    let username;
    switch (action.type) {
      case SOCKET_CONN_MOUNT:
        userId = action.payload.userId;
        entityId = action.payload.entityId;
        username = action.payload.username;
        const socketURI = process.env.REACT_APP_DEV_BASE_SOCKET;

        socket.instance = new WebSocket(socketURI);
        socket.exists = true;
        socket.instance.onmessage = (e) => {
          let data = JSON.parse(e.data);

          let { socketPayload: socketAction, payload } = data;
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
              payload: { entityId, userId, username },
            })
          );

        // TODO: socket.onclose = something to note this action in our store
        break;
      case "SOCKET_CONN_UNMOUNT":
        entityId = action.payload.entityId;
        userId = action.payload.userId;
        username = action.payload.username;

        if (socket.exists && socket.instance.readyState === 1) {
          storeApi.dispatch({ type: "RESET" });
          socket.instance.send(
            JSON.stringify({
              type: "SOCKET_CLOSE",
              payload: { entityId, userId, username },
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
