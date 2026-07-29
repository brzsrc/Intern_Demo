import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {appAuth} from "../../firebase/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, User as FirebaseUser} from "firebase/auth";
import { updateProfile } from "firebase/auth";


type UserInfo = {
    fullName: string;
    email: string;
    // idToken: string;
}

type User = UserInfo | null;

type AuthCxtComponents = {
    user: User;
    login: (email: string, password: string) => void;
    logout: () => void;
    signup: (fullName:string, email: string, password: string) => void;
    isAuthenticated: boolean;
} | null

const AuthCxt = createContext<AuthCxtComponents>(null);


export function AuthProvider({children}: { children: ReactNode }) {
    useEffect(() => {
        const unsubscribe = appAuth.onAuthStateChanged(updateUser)
        return unsubscribe
    }, [])

    const [curUser, setCurUser] = useState<User>(null)
    const [loading, setLoading] = useState<boolean>(true)

    function updateUser(user: FirebaseUser | null) {
        setLoading(false)
        if (!user) {
            setCurUser(null)
            return
        }
        setCurUser({
            email: user.email?? "",
            fullName: user.displayName ?? "",
            // idToken: await user.getIdToken() ?? ""
        })
        return
    }

    const isAuthenticated = !!curUser

    async function login(email: string, password: string) {
        const cred = await signInWithEmailAndPassword(appAuth, email, password);
    }

    async function logout() {
        const cred = await appAuth.signOut();
    }

    async function signup(fullName: string, email: string, password: string) {
        const cred = await createUserWithEmailAndPassword(appAuth, email, password);
        await updateProfile(cred.user, {displayName: fullName})
    }


    return (
        <AuthCxt.Provider value={{user:curUser, login, logout, signup, isAuthenticated}}>
            {!loading && children}
        </AuthCxt.Provider>
    )

}

export function useAuth() {
    const ctx = useContext(AuthCxt)
    if (!ctx) throw new Error("AuthCxt is null");
    return ctx
}
