import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import tagsReducer from './tagsSlice';
import modalReducer from './modalSlice'

export const store = configureStore({
    reducer : {
        token : tokenReducer,
        tags : tagsReducer,
        modal: modalReducer
    }
});