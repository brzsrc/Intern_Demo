import {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {appAuth} from "../firebase/firebase";
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, User as FirebaseUser} from "firebase/auth";
import {updateProfile} from "firebase/auth";
import {api} from "../apis/api";
import {useQuery} from "@tanstack/react-query";
import {getAuth} from "../queryOptions/queries";


type UserInfo = {
    // fullName: string;
    // email: string;
    // id: string;
    // avatar?: string;
    firebase_uid: string;
}

type User = UserInfo | null;

type AuthCxtComponents = {
    user: User;
    login: (email: string, password: string) => void;
    logout: () => void;
    signup: (fullName: string, email: string, password: string) => void;
    signUpWithGoogle: () => void;
    isAuthenticated: boolean;
} | null

const AuthCxt = createContext<AuthCxtComponents>(null);


export function AuthProvider({children}: { children: ReactNode }) {
    useEffect(() => {
        const unsubscribe = appAuth.onAuthStateChanged(updateUser)
        return unsubscribe
    }, [])

    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const signingUp = useRef(false);

    async function updateUser(firebaseUser: FirebaseUser | null) {
        if (signingUp.current) return
        if (!firebaseUser) {
            setUser(null)
            setLoading(false)
            return null
        }

        // const user = await getCurrentUser()
        // if (!user) {
        //     setUser(null)
        // } else {
        //     setUser({
        //         email: user.email,
        //         fullName: user.name,
        //         id: user.id,
        //         avatar: user.avatar,
        //     })
        // }
        setUser({firebase_uid: firebaseUser.uid})
        setLoading(false)
        return user
    }

    const isAuthenticated = !!user



    async function login(email: string, password: string) {
        await signInWithEmailAndPassword(appAuth, email, password);
    }

    async function logout() {
        await appAuth.signOut();
    }

    async function signup(fullName: string, email: string, password: string) {
        signingUp.current = true;
        setLoading(true)
        try {
            const cred = await createUserWithEmailAndPassword(appAuth, email, password);
            await updateProfile(cred.user, {displayName: fullName});
            await cred.user.getIdToken(true)
            setUser({firebase_uid: cred.user.uid})
        } finally {
            signingUp.current = false;
            setLoading(false)
        }
    }

    const googleProvider = new GoogleAuthProvider();
    async function signUpWithGoogle() {
        await signInWithPopup(appAuth, googleProvider);
    }


    return (
        <AuthCxt.Provider value={{user, login, logout, signup, signUpWithGoogle, isAuthenticated}}>
            {!loading && children}
        </AuthCxt.Provider>
    )

}

export function useAuth() {
    const ctx = useContext(AuthCxt)
    if (!ctx) throw new Error("AuthCxt is null");
    return ctx
}
