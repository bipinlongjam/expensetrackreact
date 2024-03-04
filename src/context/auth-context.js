import React,{createContext, useContext, useState} from "react";

const UserContext = createContext({
    token:'',
    isLoggedIn: false,
    signUp: () =>{},
    login: (token) =>{},
    logout:()=>{}
})

export const useExpense = () => useContext(UserContext);

export const ExpenseProvider =({children}) =>{
    
    const[token, setToken] = useState('')

    //Login handler
    // const loginHandler = (token) =>{
    // setToken(token)
    // localStorage.setItem('token', token);

    const signUphandler = ()=>{

    }

    const value = {
        token:token,
        signUp:signUphandler
    }
    return(
        <ExpenseProvider.Provider value={value}>
            {children}
        </ExpenseProvider.Provider>
    )
}

