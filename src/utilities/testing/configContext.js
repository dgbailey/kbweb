import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const mockStore = configureMockStore();

/** 
 * @function TestingContext
 * @param React-Element - React Element to be wrapped
 * @param Object storeState -Object representing desired store state
 * @returns Element wrapped in Redux Provider, Context Provider, BrowserRouter

**/

export function TestingContext({ children, storeState }) {
	return (
		<Provider store={mockStore(storeState) || mockStore({ default: true })}>
			<Router>{children}</Router>
		</Provider>
	);
}
