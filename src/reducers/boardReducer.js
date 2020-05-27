import uuid4 from "uuid4";
import {
  ADD_COL_START,
  ADD_COL_SUCCESS,
  ADD_COL_FAILURE,
} from "../actions/addColumn";
import {
  ADD_BOARD_START,
  ADD_BOARD_SUCCESS,
  ADD_BOARD_FAILURE,
} from "../actions/addBoard";
import {
  FETCH_BOARD_START,
  FETCH_BOARD_SUCCESS,
  FETCH_BOARD_FAILURE,
} from "../actions/fetchBoardByBoardId";
import {
  FETCH_BOARDCOLS_START,
  FETCH_BOARDCOLS_SUCCESS,
  FETCH_BOARDCOLS_FAILURE,
} from "../actions/fetchColumnsByBoardId";
import {
  FETCH_BOARDITEMS_START,
  FETCH_BOARDITEMS_SUCCESS,
  FETCH_BOARDITEMS_FAILURE,
} from "../actions/fetchItemsByBoardId";
import {
  ADD_ITEM_START,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
} from "../actions/addItem";
import {
  FETCH_MEMBERS_START,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_FAILURE,
} from "../actions/fetchBoardMembersByBoardId";

const experimentalBoardState = {
  //https://stackoverflow.com/questions/34401098/remove-a-property-in-an-object-immutably
  addColumnStart: false,
  addColumnSuccess: false,
  addColumnFailure: "",
  addBoardStart: false,
  addBoardSuccess: false,
  addBoardFailure: "",
  addItemStart: false,
  addItemSuccess: false,
  addItemFailure: "",
  activeBoard: null,
  fetchMembersStart: false,
  fetchMembersSuccess: false,
  fetchMembersFailure: false,

  entities: {
    members: {
      byId: {},
    },
    boards: {
      byId: {},
      allIds: [],
    },
    columns: {
      byId: {},
      allIds: [],
    },

    items: {
      byId: {},

      allIds: [],
    },
    columnBoard: {
      byId: {},
      allIds: [],
    },
    itemColumn: {
      byId: {},
      allIds: [],
    },
  },
};

export const expBoardReducer = (state = experimentalBoardState, action) => {
  const { entities } = state;
  const { boards, columns, items, columnBoard, itemColumn, members } = entities;
  switch (action.type) {
    case ADD_BOARD_START:
      return {
        ...state,
        addBoardStart: true,
        addBoardSuccess: false,
        addBoardFailure: false,
      };
    case ADD_BOARD_SUCCESS:
      return {
        ...state,
        addBoardStart: false,
        addBoardSuccess: true,
        activeBoard: action.payload.board_id,
        entities: {
          ...entities,
          boards: {
            ...boards,
            byId: {
              ...boards.byId,
              [action.payload.board_id]: action.payload,
            },
            allIds: [...boards.allIds, action.payload.board_id],
          },
        },
      };
    case ADD_BOARD_FAILURE:
      return {
        ...state,
        addBoardStart: false,
        addBoardSuccess: false,
        addBoardFailure: action.payload,
      };
    case FETCH_BOARD_START:
      return {
        ...state,
        fetchBoardStart: true,
        fetchBoardSuccess: false,
        fetchBoardFailure: false,
      };
    case FETCH_BOARD_SUCCESS:
      return {
        ...state,
        fetchBoardStart: false,
        fetchBoardSuccess: true,
        activeBoard: action.payload.board_id,
        entities: {
          ...entities,
          boards: {
            ...boards,
            byId: {
              ...boards.byId,
              [action.payload.board_id]: action.payload,
            },
            allIds: [...boards.allIds, action.payload.board_id],
          },
        },
      };
    case FETCH_BOARD_FAILURE:
      return {
        ...state,
        fetchBoardStart: false,
        fetchBoardSuccess: false,
        fetchBoardFailure: action.payload,
      };

    case ADD_COL_START:
      return {
        ...state,
        addColumnStart: true,
        addColumnSuccess: false,
        addColumnFailure: "",
      };
    case ADD_COL_SUCCESS:
      return {
        ...state,
        addColumnStart: false,
        addColumnSuccess: true,
        entities: {
          ...entities,
          columns: {
            ...columns,
            byId: {
              ...columns.byId,
              [action.payload.column_id]: action.payload,
            },
            allIds: [...columns.allIds, action.payload.column_id],
          },
          columnBoard: {
            ...columnBoard,
            byId: {
              ...columnBoard.byId,
              [uuid4()]: action.payload,
            },
          },
        },
      };
    case ADD_COL_FAILURE:
      return {
        ...state,
        addColumnStart: false,
        addColumnSuccess: false,
        addColumnFailure: action.payload,
      };
    case FETCH_BOARDCOLS_START:
      return {
        ...state,
        fetchColumnStart: true,
        fetchColumnSuccess: false,
        fetchColumnFailure: "",
      };
    case FETCH_BOARDCOLS_SUCCESS:
      return {
        ...state,
        fetchColumnStart: false,
        fetchColumnSuccess: true,
        entities: {
          ...entities,
          columns: {
            ...columns,
            byId: {
              ...columns.byId,
              ...action.payload.reduce((obj, v) => {
                obj[v.column_id] = v;
                return obj;
              }, {}),
            },
          },
          columnBoard: {
            ...columnBoard,
            byId: {
              ...columnBoard.byId,
              ...action.payload.reduce((obj, v) => {
                obj[uuid4()] = v;
                return obj;
              }, {}),
            },
          },
          allIds: [...columns.allIds, action.payload.column_id],
        },
      };
    case FETCH_BOARDCOLS_FAILURE:
      return {
        ...state,
        fetchColumnStart: false,
        fetchColumnSuccess: false,
        fetchColumnFailure: action.payload,
      };

    case ADD_ITEM_START:
      return {
        ...state,
        addItemStart: true,
        addItemSuccess: false,
        addItemFailure: "",
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        addItemStart: false,
        addItemSuccess: true,
        entities: {
          ...entities,
          items: {
            ...items,
            byId: {
              ...items.byId,
              [action.payload.item_id]: action.payload,
            },
            allIds: [...items.allIds, action.payload.item_id],
          },
          itemColumn: {
            ...itemColumn,
            byId: {
              ...itemColumn.byId,
              [action.payload.item_id]: action.payload,
            },
          },
        },
      };
    case ADD_ITEM_FAILURE:
      return {
        ...state,
        addItemStart: false,
        addItemSuccess: false,
        addItemFailure: action.payload,
      };
    case FETCH_BOARDITEMS_START:
      return {
        ...state,
        fetchItemStart: true,
        fetchItemSuccess: false,
        fetchItemFailure: "",
      };
    case FETCH_BOARDITEMS_SUCCESS:
      return {
        ...state,
        fetchItemStart: false,
        fetchItemSuccess: true,
        entities: {
          ...entities,
          items: {
            ...items,
            byId: {
              ...items.byId,
              ...action.payload.reduce((obj, v) => {
                obj[v.item_id] = v;
                return obj;
              }, {}),
            },
          },
          itemColumn: {
            ...itemColumn,
            byId: {
              ...itemColumn.byId,
              ...action.payload.reduce((obj, v) => {
                obj[v.item_id] = v;
                return obj;
              }, {}),
            },
          },
          allIds: [...items.allIds, action.payload.item_id],
        },
      };
    case FETCH_BOARDITEMS_FAILURE:
      return {
        ...state,
        fetchItemStart: false,
        fetchItemSuccess: false,
        fetchItemFailure: action.payload,
      };
    case "RESET":
      return {
        ...experimentalBoardState,
      };
    case "SOCKET_CLOSE":
      members.byId[action.payload.userId]["isActive"] = action.payload.status;

      return {
        ...state,
        entities: {
          ...entities,
          members: {
            ...members,
            byId: {
              ...members.byId,
              [action.payload.userId]: member,
            },
          },
        },
      };

    case "SOCKET_OPEN":
      let member = members.byId[action.payload.userId];
      member["isActive"] = action.payload.status;
      return {
        ...state,
        entities: {
          ...entities,
          members: {
            ...members,
            byId: {
              ...members.byId,
              [action.payload.userId]: member,
            },
          },
        },
      };

    case FETCH_MEMBERS_START:
      return {
        ...state,
        fetchMembersStart: true,
      };
    case FETCH_MEMBERS_SUCCESS:
      return {
        ...state,
        fetchMembersStart: false,
        fetchMembersSuccess: true,
        entities: {
          ...entities,
          members: {
            ...members,
            byId: {
              ...action.payload.reduce((obj, curr) => {
                obj[curr.user_uuid] = curr;
                return obj;
              }, {}),
            },
          },
        },
      };
    case FETCH_MEMBERS_FAILURE:
      return {
        ...state,
        fetchMembersStart: false,
        fetchMembersSuccess: false,
        fetchMembersFailure: true,
      };

    default:
      return state;
  }
};
