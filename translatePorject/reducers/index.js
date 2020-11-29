import {HYDRATE} from 'next-redux-wrapper';
import {combineReducers} from 'redux';

import translate from './translate';

const rootReducer =combineReducers({

    index:(state={},action)=>{
        switch(action.type){
            case HYDRATE:
                console.log('Hydreate',HYDRATE);
                return {...state,...action.payload};
            default:
                return state;
        }


    },
    translate,



});
export default rootReducer;