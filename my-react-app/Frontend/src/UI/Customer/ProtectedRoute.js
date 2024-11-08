import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

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
