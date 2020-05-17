import { applyMiddleware, createStore } from 'redux';
import { socketMiddleware } from '../../middleware/socketMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '../../reducers/index';

/** 
 * @function configureStore
 * @returns {Object} store

**/
export const configureStore = () => {
	let middlewares = [ socketMiddleware() ];
	let middlewareEnhancer = applyMiddleware(...middlewares);
	const enhancers = [ middlewareEnhancer ];
	const composedEnhancers = composeWithDevTools(...enhancers);
	const store = createStore(rootReducer, composedEnhancers);
	return store;
};
