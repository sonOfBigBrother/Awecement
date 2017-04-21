/**
 * Created by David Xie on 2017/4/19.
 */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as reducers from './reducer';
import middlewares from './middleware';
const reducer = combineReducers(reducers);

const store = applyMiddleware(...middlewares)(createStore)(reducer);

export const Store = store;