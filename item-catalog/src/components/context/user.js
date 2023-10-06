import {React, useState, useContext, createContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        navigate("/login")
        
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