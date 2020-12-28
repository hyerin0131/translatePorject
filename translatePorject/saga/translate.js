import axios from 'axios';
import { all, takeLatest, fork, put, delay, call } from 'redux-saga/effects';
import faker from 'faker';
import {
  TRANSLATE_SIMPLE_REQUEST,
  TRANSLATE_SIMPLE_SUCCESS,
  TRANSLATE_SIMPLE_FAILURE,
  TRANSLATE_TEMPLATE_REQUEST,
  TRANSLATE_TEMPLATE_SUCCESS,
  TRANSLATE_TEMPLATE_FAILURE,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../reducers/translate';

function translateSimpleAPI(data) {
  return axios.post('http://192.168.25.54:5000/extractverbphrase', data);
}

function* translateSimple(action) {
  const result = yield call(translateSimpleAPI, action.data, {
    withCredentials: true,
  });
  yield delay(100);
  try {
    console.log('done');
    console.log(action.data);
    yield put({
      type: TRANSLATE_SIMPLE_SUCCESS,
      Output: faker.lorem.paragraphs() + faker.lorem.paragraphs(),
      Input: action.data,
      id: faker.random.number(),
    });
  } catch (error) {
    console.log('fails');
    yield put({
      type: TRANSLATE_SIMPLE_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchTranslateSimple() {
  yield takeLatest(TRANSLATE_SIMPLE_REQUEST, translateSimple);
}
function translateTemplateAPI(data, value) {
  return axios.post(`/simple/${value}`, data, { withCredentials: true });
}

function* translateTemplate(action) {
  console.log('pass');
  // const result = yield call(translateTemplateAPI, action.data,{ withCredentials: true });
  console.log(action.value);
  yield delay(100);
  try {
    console.log('done');
    console.log(action.data);
    yield put({
      type: TRANSLATE_TEMPLATE_SUCCESS,
      Output: faker.lorem.paragraphs() + faker.lorem.paragraphs(),
      Input: action.data,
      id: faker.random.number(),
    });
  } catch (error) {
    console.log('fails');
    yield put({
      type: TRANSLATE_TEMPLATE_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchTranslateTemplate() {
  yield takeLatest(TRANSLATE_TEMPLATE_REQUEST, translateTemplate);
}
function loginAPI(data) {
  return axios.post('/login', data);
}

function* login(action) {
  // const result = yield call(loginAPI, action.id,{ withCredentials: true });
  yield delay(100);
  try {
    console.log('done');
    // console.log(action.id);
    yield put({
      type: LOGIN_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.log('fails');
    yield put({
      type: LOGIN_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchlogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}
function logoutAPI(data) {
  return axios.post('/logout', data, { withCredentials: true });
}

function* logout(action) {
  // const result = yield call(logoutAPI, action.id);
  yield delay(100);
  try {
    console.log('done');
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.log('fails');
    yield put({
      type: LOGOUT_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchlogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}
function sendEmailAPI(data) {
  return axios.post('/sendEmail', data, { withCredentials: true });
}

function* sendEmail(action) {
  // const result = yield call(sendEmailAPI, action.id);
  yield delay(100);
  try {
    console.log('done');
    yield put({
      type: SEND_EMAIL_SUCCESS,
    });
  } catch (error) {
    console.log('fails');
    yield put({
      type: SEND_EMAIL_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchSendEmail() {
  yield takeLatest(SEND_EMAIL_REQUEST, sendEmail);
}

export default function* translateSaga() {
  console.log('watch Saga');
  yield all([
    fork(watchTranslateSimple),
    fork(watchlogin),
    fork(watchlogout),
    fork(watchTranslateTemplate),
    fork(watchSendEmail),
  ]);
}
