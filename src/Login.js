import React, {useEffect,useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {Link,Redirect} from 'react-router-dom';
import {registerCredentialsAction} from './actions/sendCredentials';


export const Login = () => {
    
    //on component mount check local storage, if token render redirect to board + board id
    //otherwise complete full call to server for recent boards, push to board id from json token
    const [authenticated,setAuthenticated] = useState(false);
    const [homeLink, setHomeLink] = useState(null);
    const [credentials,setCredentials] = useState({});
    const dispatch = useDispatch();
   

    useEffect(() => {
        let homeLinkPrefix = '/home/';
        function checkAuthStatus(){
            const token = localStorage.getItem('kbt');
            if(!token){
               //if no token render login default
            }
            else{
                //token time validation
                //if true setAuthenticated(true);
                //set board link
                //redirect to board/:id
               
                let recentBoardUrl = homeLinkPrefix + 'board/' + token;
                setHomeLink(recentBoardUrl);
                setAuthenticated(true);
            }
            
        }
        checkAuthStatus();
    },[])

    function registerCredentials(){
      
        registerCredentialsAction(credentials)(dispatch);

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
                <button className="login-btn">Register</button>
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