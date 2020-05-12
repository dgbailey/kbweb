import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();
import { Provider } from 'react-redux';

describe('App Component tests', () => {
	let context;
	let wrapper;
	beforeAll(() => {
		const store = mockStore({ loginStatus: true });
		context = (
			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		);
		wrapper = mount(context);
	});

	test('Test mount', () => {
		expect(wrapper.containsMatchingElement(<App />)).toBe(true);
	});
});
