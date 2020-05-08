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

const socketURI = process.env.REACT_APP_DEV_BASE_SOCKET;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(socketMiddleware(socketURI))));

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
