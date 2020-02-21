

const registrationURI = 'http://localhost:8080/flow/signup';
export const registerCredentialsAction =  async (creds,dispatch) => {

    try{
        dispatch({type:'START_REGISTRATION'})
        let settings = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(creds)
        }
        
        let response = await fetch(registrationURI,settings);
        let token =  await response.json();
        console.log('token',token)
        dispatch({type:'REGISTRATION_COMPLETE'});
        window.localStorage.setItem('kbt',token);
    }
    catch(err){
        dispatch({type:'REGISTRATION_ERROR',payload:err});
        console.log(err)
    }
  


}