import {useAuth} from "../contexts/AuthContext";
import {Navigate} from "react-router-dom";
import {ReactNode} from "react";


export default function({children}: {children: ReactNode} ) {
    const AuthContext = useAuth()

    return AuthContext.isAuthenticated ? <> {children} </> : <Navigate to={"/login"}/>
}