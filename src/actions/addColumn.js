import {queryStringGenerator} from '../utilities/queryStringGenerator';
export const ADD_COL_START = 'ADD_COL_START';
export const ADD_COL_SUCCESS = 'ADD_COL_SUCCESS';
export const ADD_COL_FAILURE = 'ADD_COL_FAILURE';

const addColUri = 'http://localhost:8080/columns';

export const addColumn = async (colObject,dispatch) => {
    const fetchUri = queryStringGenerator(addColUri,{...colObject});
    let metaData = {
        method:'POST',
        headers:{
            'Content-Type':'application-json'
        },
        credentials:'include'
    }
    try{
        dispatch({type:ADD_COL_START});
        let column = await fetch(fetchUri,metaData);
        dispatch({type:ADD_COL_SUCCESS,payload:column});
    }
    catch(error){
        dispatch({type:ADD_COL_FAILURE,payload:error});
    }

}