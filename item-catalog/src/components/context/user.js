import {React, useState, useContext, createContext, useEffect} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  
    const [user, setUser] = useState(sessionStorage.getItem("signedInUser"));

    const login = (user) => {
        sessionStorage.setItem('signedInUser', user)
        setUser(sessionStorage.getItem('signedInUser'))
    }

    const logout = () => {
        setUser(null)
        sessionStorage.clear()
    }

    return (<>
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    </>)
}

export const useAuth = () => {
    return useContext(AuthContext);
}