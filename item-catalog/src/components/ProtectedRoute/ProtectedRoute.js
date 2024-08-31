import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/user";

const ProtectedRoute = ({children}) => 
{
    const auth = useAuth()
    const location = useLocation()

    if (auth.user===null)
    {
        return <Navigate to="/login" state={{path: location.pathname}}/>
    }

    return children
}

export default ProtectedRoute