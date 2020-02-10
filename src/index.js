import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from './reducers/index';


//create root reducer
//remove reducer from board
//add use selector to board
//use thunk middleware
//create store

const store = createStore(rootReducer);
console.log(store)
console.log(store.getState())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    
    
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
