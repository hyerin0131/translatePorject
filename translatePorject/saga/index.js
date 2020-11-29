import {all,fork} from 'redux-saga/effects';
import {combineReducers} from 'redux';


import  translate from './translate';
export function* rootSaga(){

    yield all([fork(translate)]);

}

export default rootSaga;