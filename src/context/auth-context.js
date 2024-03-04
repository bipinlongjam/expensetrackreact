import React, { createContext, useContext, useState } from "react";

const UserContext = createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});

export const useExpense = () => useContext(UserContext);

export const ExpenseProvider = ({ children }) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    // Login handler
    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    const userIsLoggedIn = !!token; // Convert token to boolean

    const value = {
        token: token,
        login: loginHandler,
        userIsLoggedIn: userIsLoggedIn // Corrected usage
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default ExpenseProvider;
