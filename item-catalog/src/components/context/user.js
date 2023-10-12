import {React, useState, useContext, createContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  
    const [user, setUser] = useState(sessionStorage.getItem("signedInUser"));
    const [email, setEmail] = useState(sessionStorage.getItem("signedInEmail"));
    const navigate = useNavigate()

    const login = (user, email) => {
        sessionStorage.setItem('signedInUser', user)
        sessionStorage.setItem('signedInEmail', email)
        setUser(user)
        setEmail(email)
    }

    const logout = () => {
        setUser(null)
        setEmail(null)
        sessionStorage.setItem('signedInUser', null)
        sessionStorage.setItem('signedInEmail', null)
        navigate("/login")
        
    }

    useEffect(()=>{
        if(sessionStorage.getItem('signedInUser')!==null)
        {
            setUser(sessionStorage.getItem('signedInUser'))
        }

    }, [user])

    return (<>
        <AuthContext.Provider value={{user, email, login, logout}}>
            {children}
        </AuthContext.Provider>
    </>)
}

export const useAuth = () => {
    return useContext(AuthContext);
}