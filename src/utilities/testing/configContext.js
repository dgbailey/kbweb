import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
const mockStore = configureMockStore();

export function TestingContext({ children, storeState }) {
	return (
		<Provider store={mockStore(storeState) || mockStore({ default: true })}>
			<Router>{children}</Router>
		</Provider>
	);
}
