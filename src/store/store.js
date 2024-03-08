import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authsignIn';
import logoutReducer from "./logoutAuth";
import expensesReducer from './expensestore';



const store = configureStore({
    reducer:{
        auth: authReducer,
        logout: logoutReducer,
        expense: expensesReducer
       
       
    }
})
export default store;