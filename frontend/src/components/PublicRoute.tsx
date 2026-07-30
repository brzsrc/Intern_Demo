import {useAuth} from "../contexts/AuthContext";
import {Navigate} from "react-router-dom";
import React, {ReactNode} from "react";


export default function({children}: {children: ReactNode}) {
    const auth = useAuth()

    return auth.isAuthenticated ? <Navigate to={"/dashboard"}/> : <>{children}</>
}