import { useContext } from "react"
import AuthContext from "../Context/AuthContext"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children , role}) => {
    const {user} = useContext(AuthContext);
    if(!user) {
        return <Navigate to={"/Login"} />
    }
    
    if(role && user.role !== role){
        return <Navigate to={"/"}/>
    }
    return children;
}

export default ProtectedRoute;