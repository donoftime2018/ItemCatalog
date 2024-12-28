import { Navigate, useLocation} from "react-router-dom";
import { useAuth } from "../context/user";

const ProtectedRoute = ({children}) => 
{
    const auth = useAuth()
    const location = useLocation()
    const user = auth.user

    if (user===null)
    {
        return <Navigate to="/login" state={{path: location.pathname}}/>
    }

    return children
}

export default ProtectedRoute