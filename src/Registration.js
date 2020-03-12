import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { registerCredentialsAction } from './actions/registerCredentials';
import { useHistory } from 'react-router-dom';
const uuid4 = require('uuid4');

export const Registration = () => {
	//on component mount check local storage, if token render redirect to board + board id
	//otherwise complete full call to server for recent boards, push to board id from json token
	const registrationStatus = useSelector((state) => state.registrationStatus);
	const { registrationSuccess, registrationError, registrationStart } = registrationStatus;
	const [ credentials, setCredentials ] = useState({});
	const dispatch = useDispatch();
	const homeLink = '/home';

	function registerCredentials() {
		registerCredentialsAction(credentials, dispatch);
	}

	function handleChange(e) {
		let capturedCredentials = {};
		capturedCredentials[e.target.name] = e.target.value;
		setCredentials({ ...credentials, ...capturedCredentials });
	}
	function renderRegistration() {
		return (
			<StyledLogin>
				{registrationStart && <div>...Registering</div>}
				{registrationError.length > 0 && <div>...Registering</div>}
				<input onChange={handleChange} name="username" type="text" className="input username" />
				<input onChange={handleChange} name="password" className="input password" type="password" />
				<Link>
					<button onClick={registerCredentials} className="login-btn">
						Sign Up
					</button>
					<Link to="/">Login</Link>
				</Link>
			</StyledLogin>
		);
	}
	function renderRedirect() {
		return <Redirect to={homeLink} />;
	}

	function renderComponent() {
		switch (registrationSuccess) {
			case true:
				return renderRedirect();
			default:
				return renderRegistration();
		}
	}

	return renderComponent();
};

const StyledLogin = styled.form`
	max-width: 400px;
	height: 400px;
	border: 1px solid lightgray;
	box-shadow: 0px 5px 10px rgb(200, 200, 200);
	margin: 100px auto;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.login-btn {
		width: 100px;
	}
`;
