import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from './commentsSlice'
import userReducer from './userSlice'

export const store = configureStore({
    reducer:{
        user: userReducer,
        comments: commentsReducer
    }
})