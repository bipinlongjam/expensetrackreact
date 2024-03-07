import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authsignIn';
import logoutReducer from "./logoutAuth";
import expenseReducer from './expensestore'


const store = configureStore({
    reducer:{
        auth: authReducer,
        logout: logoutReducer,
        expense: expenseReducer
    }
})
export default store;