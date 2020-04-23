import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './reducers/index';
import { BrowserRouter } from 'react-router-dom';
import { socketMiddleware } from './middleware/socketMiddleware';

//create root reducer
//remove reducer from board
//add use selector to board
//use thunk middleware
//create store
const socketURI = process.env.REACT_APP_DEV_BASE_SOCKET;
const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(socketMiddleware(socketURI)),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
