import uuid4 from 'uuid4';
import { ADD_COL_START, ADD_COL_SUCCESS, ADD_COL_FAILURE } from '../actions/addColumn';
import { ADD_BOARD_START, ADD_BOARD_SUCCESS, ADD_BOARD_FAILURE } from '../actions/addBoard';
import { FETCH_BOARD_START, FETCH_BOARD_SUCCESS, FETCH_BOARD_FAILURE } from '../actions/fetchBoardByBoardId';
import { ADD_ITEM_START, ADD_ITEM_SUCCESS, ADD_ITEM_FAILURE } from '../actions/addItem';

const uuid0 = uuid4();
const uuid1 = uuid4();
const uuid2 = uuid4();
const uuid3 = uuid4();
const uuid5 = uuid4();
const uuid6 = uuid4();
const uuid7 = uuid4();
const uuid8 = uuid4();
const uuid9 = uuid4();
const boardId = uuid4();

const initialState = {
	boardName: 'Default Board',
	currentColumn: null,
	boardId: boardId,
	cols: {
		[uuid1]: {
			id: uuid1,
			items: [ { text: 'title1', id: uuid4() }, { text: 'nast', id: uuid4() } ]
		},
		[uuid2]: {
			id: uuid2,
			items: [ { text: 'title2', id: uuid4() }, { text: 'vast', id: uuid4() } ]
		},
		[uuid3]: {
			id: uuid3,
			items: [ { text: 'title3', id: uuid4() }, { text: 'fast', id: uuid4() } ]
		},
		[uuid5]: {
			id: uuid5,
			items: [ { text: 'title4', id: uuid4() }, { text: 'cast', id: uuid4() } ]
		}
	}
};

const experimentalBoardState = {
	//https://stackoverflow.com/questions/34401098/remove-a-property-in-an-object-immutably
	addColumnStart: false,
	addColumnSuccess: false,
	addColumnFailure: '',
	addBoardStart: false,
	addBoardSuccess: false,
	addBoardFailure: '',
	addItemStart: false,
	addItemSuccess: false,
	addItemFailure: '',
	activeBoard: null,

	boards: {
		byId: {
			// [uuid0]: {
			// 	boardName: 'Default-Board',
			// 	id: uuid0
			// }
		},
		allIds: []
	},
	columns: {
		byId: {
			// [uuid1]:{
			//     id:uuid1,
			//     boardId:uuid0,
			//     columnName:'Default Name A',
			//     pos:0,
			// },
			// [uuid2]:{
			//     id:uuid2,
			//     boardId:uuid0,
			//     columnName:'Default Name B',
			//     pos:1,
			// },
			// [uuid3]:{
			//     id:uuid3,
			//     boardId:uuid0,
			//     columnName:'Default Name C',
			//     pos:2,
			// },
			// [uuid4]:{
			//     id:uuid4,
			//     boardId:uuid0,
			//     columnName:'Default Name D',
			//     pos:3,
			// },
		},
		allIds: []
	},

	items: {
		byId: {
			// [uuid6]:{
			//     id:uuid6,
			//     colId:uuid1,
			//     itemContent:'Default Item A',
			//     pos:0
			// },
			// [uuid7]:{
			//     id:uuid7,
			//     colId:uuid2,
			//     itemContent:'Default Item B',
			//     pos:0
			// },
			// [uuid8]:{
			//     id:uuid8,
			//     colId:uuid3,
			//     itemContent:'Default Item C',
			//     pos:0
			// },
			// [uuid9]:{
			//     id:uuid9,
			//     colId:uuid4,
			//     itemContent:'Default Item D',
			//     pos:0
			// },
		},

		allIds: []
	}
};

export const expBoardReducer = (state = experimentalBoardState, action) => {
	switch (action.type) {
		case ADD_BOARD_START:
			return {
				...state,
				addBoardStart: true,
				addBoardSuccess: false,
				addBoardFailure: false
			};
		case ADD_BOARD_SUCCESS:
			return {
				...state,
				addBoardStart: false,
				addBoardSuccess: true,
				activeBoard: action.payload.board_id,
				boards: {
					...state.boards,
					byId: {
						...state.boards.byId,
						[action.payload.board_id]: action.payload
					},
					allIds: [ ...state.boards.allIds, action.payload.board_id ]
				}
			};
		case ADD_BOARD_FAILURE:
			return {
				...state,
				addBoardStart: false,
				addBoardSuccess: false,
				addBoardFailure: action.payload
			};
		case FETCH_BOARD_START:
			return {
				...state,
				fetchBoardStart: true,
				fetchBoardSuccess: false,
				fetchBoardFailure: false
			};
		case FETCH_BOARD_SUCCESS:
			return {
				...state,
				fetchBoardStart: false,
				fetchBoardSuccess: true,
				activeBoard: action.payload.board_id,
				boards: {
					...state.boards,
					byId: {
						...state.boards.byId,
						[action.payload.board_id]: action.payload
					},
					allIds: [ ...state.boards.allIds, action.payload.board_id ]
				}
			};
		case FETCH_BOARD_FAILURE:
			return {
				...state,
				fetchBoardStart: false,
				fetchBoardSuccess: false,
				fetchBoardFailure: action.payload
			};

		case ADD_COL_START:
			return {
				...state,
				addColumnStart: true,
				addColumnSuccess: false,
				addColumnFailure: ''
			};
		case ADD_COL_SUCCESS:
			return {
				...state,
				addColumnStart: false,
				addColumnSuccess: true,
				columns: {
					...state.columns,
					byId: {
						...state.columns.byId,
						[action.payload.column_id]: action.payload
					}
				},
				allIds: [ ...state.columns.allIds, action.payload.column_id ]
			};
		case ADD_COL_FAILURE:
			return {
				...state,
				addColumnStart: false,
				addColumnSuccess: false,
				addColumnFailure: action.payload
			};
		case ADD_ITEM_START:
			return {
				...state,
				addItemStart: true,
				addItemSuccess: false,
				addItemFailure: ''
			};
		case ADD_ITEM_SUCCESS:
			return {
				...state,
				addItemStart: false,
				addItemSuccess: true,
				items: {
					...state.items,
					byId: {
						...state.items.byId,
						[action.payload.item_id]: action.payload
					}
				},
				allIds: [ ...state.items.allIds, action.payload.item_id ]
			};
		case ADD_ITEM_FAILURE:
			return {
				...state,
				addItemStart: false,
				addItemSuccess: false,
				addItemFailure: action.payload
			};

		default:
			return state;
	}
};

export const boardReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_CURRENT_COL':
			return {
				...state,
				currentColumn: action.payload
			};

		case 'SETpos':
			return {
				...state,
				keys: [ ...action.payload ]
			};

		case 'APPENDCOL':
			return {
				...state,
				cols: {
					...state.cols,
					[action.payload.id]: action.payload
				},
				keys: [ ...state.keys, action.payload.id ]
			};

		case 'APPEND':
			return {
				...state,
				cols: {
					...state.cols,
					[action.destination]: {
						...state.cols[action.destination],
						items: [ ...action.payload ]
					}
				}
			};

		case 'DELETEITEM':
			return {
				...state,
				cols: {
					...state.cols,
					[action.origin]: {
						items: [ ...state.cols[action.origin].items.filter((i) => i.id !== action.itemId) ]
					}
				}
			};
		case 'DELETE':
			let newArr = state.cols[action.colId].items.filter((i) => i.id !== action.itemId);
			let newDeleteState = {};
			newDeleteState[action.colId] = { id: action.colId, items: newArr };

			return {
				...state,
				cols: {
					...state.cols,
					...newDeleteState
				}
			};

		case 'MOVECOL':
			return {
				...state,
				cols: {
					...state.cols,
					...action.payload
				}
			};

		default:
			return state;
	}
};
