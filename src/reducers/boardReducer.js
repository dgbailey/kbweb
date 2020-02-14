
import uuid4 from 'uuid4';


const uuid1 = uuid4();
const uuid2 = uuid4();
const uuid3 = uuid4();
const uuid5 = uuid4();
const boardId = uuid4();


const initialState = {
    currentColumn:null,
    boardId:boardId,
    cols:{

        [uuid1]:{id:uuid1,'items':[{'text':'title1',id:uuid4()},{'text':'nast',id:uuid4()}]

        },
        [uuid2]:{id:uuid2,'items':[{'text':'title2',id:uuid4()},{'text':'vast',id:uuid4()}]

        },
        [uuid3]:{id:uuid3,'items':[{'text':'title3',id:uuid4()},{'text':'fast',id:uuid4()}]

        },
        [uuid5]:{id:uuid5,'items':[{'text':'title4',id:uuid4()},{'text':'cast',id:uuid4()}]

        }



    }



}


export const boardReducer = (state = initialState,action) => {
  

    switch(action.type){

        case 'UPDATE_CURRENT_COL':
        return{
            ...state,
            currentColumn: action.payload
        }
           
       
        case 'SETCOLORDER':
        return {
            ...state,
            keys:[...action.payload]
        }

        case 'APPENDCOL':

        return {
            ...state,
                cols:{
                    ...state.cols,
                    [action.payload.id]:action.payload
                },
                keys:[
                    ...state.keys,action.payload.id

            ]
        }
       
        case 'APPEND':
  
       

           return {
            ...state,
                cols:{
                    ...state.cols,
                    [action.destination]:{
                        ...state.cols[action.destination],
                        items:[
                             ...action.payload
                        ]
                    }
                   
                    }
                }
        
        case 'DELETEITEM':
        
                return{
                    ...state,
                        cols:{
                            ...state.cols,
                            [action.origin]:{
                                items:[
                                ...state.cols[action.origin].items.filter(i => i.id !== action.itemId)
                                ]
                            }

                        }
                }
        case 'DELETE':
                let newArr = state.cols[action.colId].items.filter(i => i.id !== action.itemId);
                let newDeleteState = {};
                newDeleteState[action.colId] = {id:action.colId,items:newArr};

                return {
                    ...state,
                        cols:{
                            ...state.cols,...newDeleteState
                        }

                }
                
        case 'MOVECOL':
                return {
                    ...state,
                        cols:{
                            ...state.cols,
                            ...action.payload
                        }
                }
                
        default:
                return state;


    }
    
}


