
import uuid4 from 'uuid4';


const uuid1 = uuid4();
const uuid2 = uuid4();
const uuid3 = uuid4();
const uuid5 = uuid4();
const boardId = uuid4();


const initialState = {
   
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
       
        case 'APPENDCOL':

        return {
            ...state,
                cols:{
                    ...state.cols,
                    [action.payload.id]:action.payload
                }
        }
       
        case 'APPEND':
        let column = state.cols[action.destination];
        let {items} = column;

           return {
            ...state,
                cols:{
                    ...state.cols,
                    [action.destination]:{
                        ...column,
                        items:[
                            ...items,{...action.payload}
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


