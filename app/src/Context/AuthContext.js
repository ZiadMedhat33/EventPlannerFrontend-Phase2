import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setAccessToken] = useState(localStorage.getItem("Authorization") || "");
    useEffect(() => {
        if(!token) {
            localStorage.removeItem("Authorization");
        }
    }, [token]);
    return (
        <AuthContext.Provider value={{ token, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};