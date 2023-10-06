import { Navigate } from "react-router-dom";
import { useAuth } from "../context/user";

const ProtectedRoute = ({children}) => {
    const auth = useAuth()

    if (auth.user===null)
    {
        return <Navigate to="/login"/>
    }

    return children
}

export default ProtectedRoute