import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';

import {createWrapper} from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import  createSagaMiddleware  from 'redux-saga';
import reducer from '../reducers';
import rootSaga from '../saga/index';


const configureStore =(context)=>{

    const sagaMiddleWare=createSagaMiddleware();
    const midlewares=[sagaMiddleWare];
    const enhance =process.env.NODE_ENV==='production'? compose(applyMiddleware(...midlewares)) : composeWithDevTools(applyMiddleware(...midlewares));
    const store =createStore(reducer,enhance);
    store.sagaTask =sagaMiddleWare.run(rootSaga);
    return store;


}
export default createWrapper(configureStore,{debug:process.env.NODE_ENV==='devwlopment'});