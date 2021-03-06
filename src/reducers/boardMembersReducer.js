const boardMemberState = {
  addMemberStart: false,
  addMemberSuccess: false,
  addMemberFailure: false,
};
export const boardMembersReducer = (
  initialState = boardMemberState,
  action
) => {
  switch (action.type) {
    case "ADD_BOARD_MEMBER_START":
      return {
        ...initialState,
        addMemberStart: true,
        addMemberSuccess: false,
        addMemberFailure: false,
      };
    case "ADD_BOARD_MEMBER_SUCCESS":
      return {
        ...initialState,
        addMemberSuccess: true,
        addMemberStart: false,
      };
    case "ADD_BOARD_MEMBER_FAILURE":
      return {
        ...initialState,
        addMemberSuccess: true,
        addMemberStart: false,
      };
    case "RESET":
      return {
        ...boardMemberState,
      };
    default:
      return initialState;
  }
};
