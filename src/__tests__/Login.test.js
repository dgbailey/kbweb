import '@testing-library/dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Login } from '../Login';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureMockStore();
jest.mock('react-router-dom', () => ({
	useHistory: () => ({
		history: jest.fn()
	})
}));

test('checks we are actually changing inputs', () => {
	const testUsername = 'dustin';
	const testPassword = 'test';
	const store = mockStore({ loginStatus: true });

	const { screen } = render(
		<Provider store={store}>
			<Login />
		</Provider>
	);
	fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'dustin' } });
	fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'test' } });

	expect(screen.queryByText(testUsername)).toBe(testUsername);
	expect(screen.queryByText(testUsername)).toBe(testUsername);
});
<<<<<<< HEAD
=======
//test commit message
>>>>>>> ab3da8fc8dcbc5088497b2604149f7de2c8871fa
