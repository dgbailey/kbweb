export const FETCH_MEMBERS_START = "FETCH_MEMBERS_START";
export const FETCH_MEMBERS_SUCCESS = "FETCH_MEMBERS_SUCCESS";
export const FETCH_MEMBERS_FAILURE = "FETCH_MEMBERS_FAILURE";

export const fetchBoardMembersByBoardId = async (boardUuid, dispatch) => {
  const boardUri =
    process.env.REACT_APP_DEV_BASE_URI + `/boards/${boardUuid}/members`;

  let settings = {
    "Content-Type": "application/json",
    credentials: "include",
    method: "GET",
  };
  try {
    dispatch({ type: FETCH_MEMBERS_START });
    let members = await (await fetch(boardUri, settings)).json();
    dispatch({ type: FETCH_MEMBERS_SUCCESS, payload: members });
  } catch (err) {
    dispatch({ type: FETCH_MEMBERS_FAILURE, payload: err });
  }
};
