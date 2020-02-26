

const registrationURI = 'http://localhost:8080/flow/signup';
export const registerCredentialsAction =  async (creds,dispatch) => {

    try{
        //remember 400/500 are responses not network errors.  You still need to check if the response is good   
        dispatch({type:'START_REGISTRATION'})
        let settings = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(creds),
            credentials: 'include',
            
            
        }
        
        let response = await fetch(registrationURI,settings);
        let tokenResolved =  await response.json();
        if(response.status === 200){
           
            dispatch({type:'REGISTRATION_COMPLETE'});
            window.localStorage.setItem('kbt',tokenResolved);
        }
        else{
            throw new Error(tokenResolved)          
        }
       
    }
    catch(err){
        dispatch({type:'REGISTRATION_ERROR',payload:err.toString()});
        
      
    }
  


}