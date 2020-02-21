

const registrationURI = '';
export const registerCredentialsAction =  async creds => async dispatch => {

    try{
        dispatch({type:'START_REGISTRATION'})
        let settings = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(creds)
        }
        
        let response = await fetch(registrationURI,settings);
        dispatch({type:'REGISTRATION_COMPLETE'});
        let token =  await response.json();
    
        window.localStorage('kbt',token);
    }
    catch(err){
        dispatch({type:'REGISTRATION_ERROR'});
        console.log(err)
    }
  


}