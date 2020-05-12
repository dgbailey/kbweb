import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { loginCredentialsAction } from './actions/sendLoginCredentials';
import { useHistory } from 'react-router-dom';
import { preFlightAuthStatus } from './actions/preflightAuthStatus';

export const SIGNUP_URI = '/signup';
export const Login = () => {
	const loginStatus = useSelector((state) => state.loginStatus);
	const [ credentials, setCredentials ] = useState({ username: '', password: '' });

	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(
		() => {
			preFlightAuthStatus(dispatch, history);
			//when first mounts check cookie status. Sends GET request to preflight url and return status
		},
		[ dispatch, history ]
	);

	function handleChange(e) {
		//TODO:Look into debouncing this
		let capturedCredentials = {};
		capturedCredentials[e.target.name] = e.target.value;
		setCredentials({ ...credentials, ...capturedCredentials });
	}

	function sendCredentials() {
		loginCredentialsAction(credentials, dispatch);
	}
	function renderLogin() {
		return (
			<StyledLogin>
				{loginStatus.loginError && <div>{loginStatus.loginError}</div>}
				<label>username</label>
				<input
					onChange={handleChange}
					name="username"
					value={credentials.name}
					type="text"
					className="input username"
				/>
				<label>password</label>
				<input
					onChange={handleChange}
					name="password"
					value={credentials.password}
					className="input password"
					type="password"
				/>

				<button onClick={sendCredentials} className="login-btn">
					Login
				</button>
				<Link to={SIGNUP_URI}>Sign Up</Link>
			</StyledLogin>
		);
	}
	function renderRedirect() {
		return <Redirect to={`/home`} />;
	}

	function renderLoginConditionally() {
		switch (loginStatus.loginSuccess) {
			case true:
				return renderRedirect();
				break;
			default:
				return renderLogin();
		}
	}
	return renderLoginConditionally();
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

	.input {
		${'' /* display:block; */};
	}
	.login-btn {
		width: 100px;
	}
`;
