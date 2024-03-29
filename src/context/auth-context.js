import React, { createContext, useContext, useState } from "react";



const UserContext = createContext({
    token: '',
    isLoggedIn: false,
    user:null,
    login: (token) => { },
    logout: () => { }
});

export const useExpense = () => useContext(UserContext);

export const ExpenseProvider = ({ children }) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const [user, setUser] = useState(null);



    const userIsLoggedIn = !!token; // Convert token to boolean
    // Login handler
    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    //Logout handler
    const logoutHandler =()=>{
    localStorage.removeItem('token')
    setToken(null)
    console.log("click logout")
    console.log(token)
    }

    const value = {
        token: token,
        login: loginHandler,
        userIsLoggedIn: userIsLoggedIn, // Corrected usage
        logout :logoutHandler
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default ExpenseProvider;
