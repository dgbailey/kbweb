import React, {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import styled from 'styled-components';
import {Link,Redirect} from 'react-router-dom';
import {loginCredentialsAction} from './actions/sendLoginCredentials';
import {useHistory} from "react-router-dom";
import {preFlightAuthStatus} from './actions/preflightAuthStatus';



const uuid4 = require('uuid4');


export const Login = () => {
    
    //on component mount check local storage, if token render redirect to board + board id
    //otherwise complete full call to server for recent boards, push to board id from json token
    const loginStatus = useSelector(state => state.loginStatus);
    const{loginSuccess,loginStart,loginError} = loginStatus;
    const [credentials,setCredentials] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();
   

    useEffect(() => {
        let homeLinkPrefix = '/home/';

        
        preFlightAuthStatus(dispatch,history);
        
        
        
            //when first mounts check cookie status send get request to preflight url and return status
                //if return with board info set in state
                //push to board home that will fetch board info and set state
    },[])

    async function sendLoginCredentials(){
        
        await loginCredentialsAction(credentials,dispatch);
      
        // based on redux store push to new home board or display message 
       
       
    }

   //each function closes over its own state and props, hence why a function written here
   //will not display new redux state if you are depending on it to show some change with async

    function generateNewHomeBoard(){
        let newBoardId = uuid4();
        history.push(`/home/board/${newBoardId}`)
    }
 
    //a reducer for state of login
    //aria tags
    //uint tests
    function handleChange(e){
        let capturedCredentials = {};
        capturedCredentials[e.target.name] = e.target.value;
        setCredentials({...credentials,...capturedCredentials});
    }
    
    if(loginStart){

        return (<div>... Preflight Authenticating</div>)

    }
    else if(!loginSuccess){
        return (
           
            <StyledLogin>
             {loginError && <div>{loginError}</div>}
            <input onChange={handleChange} name="username" type='text' className="input username"></input>
      
            <input  onChange={handleChange} name = "password" className="input password" type='password'></input>
            <Link>
                <button onClick={sendLoginCredentials} className="login-btn">Login</button>
                <Link to='/signup'>Sign Up</Link>
            </Link>
            
            </StyledLogin>

        )
    }
   
 




}


const StyledLogin = styled.form `

    max-width:400px;
    height: 400px;
    border:1px solid lightgray;
    box-shadow: 0px 5px 10px rgb(200,200,200);
    margin:100px auto;
    border-radius:4px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    

    .input{
        ${'' /* display:block; */}
    }
    .login-btn{
        width:100px;
    }
`