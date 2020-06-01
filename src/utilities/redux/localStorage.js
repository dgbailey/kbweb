/**
 * @param {VoidFunction}  - returns null or JS Object
 */
export const preloadState = () => {
  try {
    let localState = JSON.parse(localStorage.getItem("state"));

    if (localState === null) {
      return undefined;
    }

    return localState;
  } catch {
    //log errors
  }
};

/**
 *
 * @param {Object} state - serializable javascript object
 */
export const saveState = (store) => {
  let serializedState = JSON.stringify({
    userMetaData: store.getState().userMetaData,
  });
  localStorage.setItem("state", serializedState);
};
