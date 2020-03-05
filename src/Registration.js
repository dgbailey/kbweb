import React, {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import styled from 'styled-components';
import {Link,Redirect} from 'react-router-dom';
import {registerCredentialsAction} from './actions/registerCredentials';
import { useHistory } from "react-router-dom";
const uuid4 = require('uuid4');


export const Registration = () => {
    
    //on component mount check local storage, if token render redirect to board + board id
    //otherwise complete full call to server for recent boards, push to board id from json token
    const registrationStatus = useSelector(state => state.registrationStatus);
    const{registrationSuccess,registrationError,registrationStart} = registrationStatus;
    const [authenticated,setAuthenticated] = useState(false);
    const [homeLink, setHomeLink] = useState(null);
    const [credentials,setCredentials] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();
   

    useEffect(() => {
        let homeLinkPrefix = '/home/';

        function checkAuthStatus(){
            if(registrationStatus.registrationSuccess){
                generateNewHomeBoard();
           }
            else if(registrationStatus.registrationError.length > 0){
               console.log('alert',registrationStatus.registrationError)
               alert(registrationStatus.registrationError);    
           }
            
            
        }
        checkAuthStatus();
    },[registrationStatus])

    async function registerCredentials(){
        
        await registerCredentialsAction(credentials,dispatch);
      
        // based on redux store push to new home board or display message 
       
       
    }

   //each function closes over its own state and props, hence why a function written here
   //will not display new redux state if you are depending on it to show some change with async

    function generateNewHomeBoard(){
        let newBoardId = uuid4();
        let defaultBoardName = 'Get-Started';
        let newBoardIdFormatted = newBoardId.replace(/-/g,"");
        history.push(`/board/experimental/${defaultBoardName}-${newBoardIdFormatted}`);
    }
 
    //a reducer for state of login
    //aria tags
    //uint tests
    function handleChange(e){
        let capturedCredentials = {};
        capturedCredentials[e.target.name] = e.target.value;
        setCredentials({...credentials,...capturedCredentials});
    }
    
    if(!authenticated){
        return (

            <StyledLogin>
            
            <input onChange={handleChange} name="username" type='text' className="input username"></input>
      
            <input  onChange={handleChange} name = "password" className="input password" type='password'></input>
            <Link>
                <button onClick={registerCredentials} className="login-btn">Sign Up</button>
                <Link to='/'>Login</Link>
            </Link>
            
            </StyledLogin>

        )
    }
    else{

        return (
            <Redirect to={homeLink}></Redirect>

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