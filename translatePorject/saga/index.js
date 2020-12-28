import { all, fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import axios from 'axios';

import translate from './translate';
axios.defaults.withCredentials = true;
export function* rootSaga() {
  yield all([fork(translate)]);
}

export default rootSaga;
