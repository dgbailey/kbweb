
const initialState = {
    loginStart:false,
    loginSuccess:false,
    loginError:null,
    loginPayload:null
}

export const loginReducer = (state=initialState,action) =>{

    switch(action.type){

        case 'PREFLIGHT_START':
            return {
                loginStart:true,
                loginSuccess:false,
                loginError:null,

            }
        case 'PREFLIGHT_SUCCESS':
            return {
                loginStart:false,
                loginSuccess:true,
                loginError:null,
                loginPayload:action.payload
            }

        case 'PREFLIGHT_FAILURE':
            return {
                loginStart:false,
                loginSuccess:false,
                loginPayload:null,
                loginError:action.payload,
            }

        case 'START_login':
            return {
                ...state,
                loginStart:true,
                loginStart:false,
                loginError:null,
                loginPayload:null
            }

        case 'login_COMPLETE':
            return {
                ...state,
                loginStart:false,
                loginSuccess:true,
                loginPayload:action.payload
            }
        
        case 'login_ERROR':
            return {
                ...state,
                loginStart:false,
                loginSuccess:false,
                loginPayload:null,
                loginError:action.payload
            }
        
        default:
            return state
    }



}