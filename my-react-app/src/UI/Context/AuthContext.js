import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        id : "",
        fullName : "",
        role : "",
    });
    useEffect (() => {
        const getSession = JSON.parse(sessionStorage.getItem("account"));
        if (getSession) {
            setUser({
                id : getSession.id,
                fullName : getSession.fullName,
                role : getSession.role
            })
        } else {
            setUser(null)
        }
    }, [])
    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;