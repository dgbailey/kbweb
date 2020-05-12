import React from 'react';
import { mount } from 'enzyme';
import { Login } from '../Login';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as preflight from '../actions/preflightAuthStatus';
const preflightSpy = jest.spyOn(preflight, 'preFlightAuthStatus');
const mockStore = configureMockStore();

describe('Login component test', () => {
	let context;
	let wrapper;
	beforeAll(() => {
		const store = mockStore({ loginStatus: true });
		context = (
			<Provider store={store}>
				<Router>
					<Login />
				</Router>
			</Provider>
		);
		wrapper = mount(context);
	});
	test('Confirm we are checking auth status on mount', () => {
		expect(preflightSpy).toHaveBeenCalledTimes(1);
	});
	test('Confirm mount', () => {
		expect(wrapper.containsMatchingElement(<Login />)).toBe(true);
	});
});
