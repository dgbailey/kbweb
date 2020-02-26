

//scenario 1
//on mount login with expired token
//user retured to homepage with error message
//local storage cleared

//scenario2 login with fresh token
//user pushed to boards in token

//scenario3 login with no token?
//user receives new token and is pushed to recent boards
//don't put primary keys in urls, do some sort of naming convention with hash value at end
//uuid with dashes removed + board name

const registrationURI = 'http://localhost:8080/';
export const loginCredentialsAction =  async (creds,dispatch) => {

    try{
        //remember 400/500 are responses not network errors.  You still need to check if the response is good   
        dispatch({type:'START_REGISTRATION'})
        let settings = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(creds)
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