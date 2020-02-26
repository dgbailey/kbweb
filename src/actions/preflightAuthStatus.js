const PREFLIGHT_AUTH_URL = 'http://localhost:8080/flow/login/preflight';
const PREFLIGHT_START = 'PREFLIGHT_START';
const PREFLIGHT_SUCCESS = 'PREFLIGHT_SUCCESS';
const PREFLIGHT_FAILURE = 'PREFLIGHT_FAILURE';

export const preFlightAuthStatus = async (dispatch,history) => {

    try{
        dispatch({type:PREFLIGHT_START})
        let settings = {
            method:'GET',
            headers:{'Content-Type':'application/json'},
            credentials: 'include',
            
            
        }
        
        let response = await fetch(PREFLIGHT_AUTH_URL,settings);
        let jsonResolved =  await response.json();
        if(response.status === 200){
            //designed to only handle one board name
            let {board_id:boardId, name} = jsonResolved;
            dispatch({type:PREFLIGHT_SUCCESS,payload:jsonResolved});
            history.push(`/home/board/${name}-${boardId}`);
            
        }
        else{
            
            throw new Error(jsonResolved)          
        }
    }
    catch(err){
        dispatch({type:PREFLIGHT_FAILURE,payload:err.message});
    }
    





}


