import {React, useState, useContext, createContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  
    const [user, setUser] = useState(sessionStorage.getItem("signedInUser"));
    const navigate = useNavigate()

    const login = (user) => {
        sessionStorage.setItem('signedInUser', user)
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        sessionStorage.setItem('signedInUser', null)
        navigate("/login")
        
    }

    useEffect(()=>{
        if(sessionStorage.getItem('signedInUser')!==null)
        {
            setUser(sessionStorage.getItem('signedInUser'))
        }

    }, [user])

    return (<>
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    </>)
}

export const useAuth = () => {
    return useContext(AuthContext);
}