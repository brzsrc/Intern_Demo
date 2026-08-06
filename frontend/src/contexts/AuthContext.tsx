import {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {appAuth} from "../firebase/firebase";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithCredential,
    signInWithPopup,
    User as FirebaseUser
} from "firebase/auth";
import {updateProfile} from "firebase/auth";
import {Capacitor} from '@capacitor/core';
import {FirebaseAuthentication} from '@capacitor-firebase/authentication';
import {SplashScreen} from '@capacitor/splash-screen';
import {AnimatedSplash} from "./AnimatedSplash";
import {ShakeToLogout} from "../plugins/device-shake/ShakeToLogout";

type UserInfo = {
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
        return () => {
            unsubscribe();
        }
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
        if (Capacitor.isNativePlatform()) {
            const result = await FirebaseAuthentication.signInWithGoogle();
            console.log('native result:', JSON.stringify(result)); // 先看 idToken 在不在
            const credential = GoogleAuthProvider.credential(result.credential?.idToken);
            await signInWithCredential(appAuth, credential);
        } else {
            await signInWithPopup(appAuth, googleProvider);
        }

    }


    return (
        <AuthCxt.Provider value={{user, login, logout, signup, signUpWithGoogle, isAuthenticated}}>
            <AnimatedSplash loading={loading} />
            <ShakeToLogout/>
            {!loading && children}
        </AuthCxt.Provider>
    )

}

export function useAuth() {
    const ctx = useContext(AuthCxt)
    if (!ctx) throw new Error("AuthCxt is null");
    return ctx
}
