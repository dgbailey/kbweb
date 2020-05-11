import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../utilities/redux/configureStore';

function customRender(ui, store = configureStore()) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}

	return render(ui, { wrapper: Wrapper });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender };

/* 
Ok so there is something going on with this testing library that I do not unserstand.  Adding data provides via the wrapper utility
is resulting is strange errors about improper imputs to the createReactElement function call. Might have to look at 
other ways to mock the store to complete circuvent this library and this utility.


*/
