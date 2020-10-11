import {applyMiddleware, compose, createStore} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE_ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose;
const enhancer=composeEnhancers(
    applyMiddleware(thunk),
)
const store=createStore(reducer,enhancer);


export default store;