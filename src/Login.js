import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { loginCredentialsAction } from './actions/sendLoginCredentials';
import { useHistory } from 'react-router-dom';
import { preFlightAuthStatus } from './actions/preflightAuthStatus';

export const Login = () => {
	const loginStatus = useSelector((state) => state.loginStatus);
	const [ credentials, setCredentials ] = useState({});
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		preFlightAuthStatus(dispatch, history);
		//when first mounts check cookie status send get request to preflight url and return status
		//push to board home that will fetch board info and set state
	}, []);

	function handleChange(e) {
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
				<input onChange={handleChange} name="username" type="text" className="input username" />

				<input onChange={handleChange} name="password" className="input password" type="password" />
				<Link>
					<button onClick={sendCredentials} className="login-btn">
						Login
					</button>
					<Link to="/signup">Sign Up</Link>
				</Link>
			</StyledLogin>
		);
	}

	function renderLoginConditionally() {
		switch (loginStatus) {
			case loginStatus.loginStart:
				return renderLogin();
			case loginStatus.loginSuccess:
				history.push(`/board/experimental/`);
			case loginStatus.loginFailure:
				return renderLogin();
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
