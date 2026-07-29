import {createContext, ReactNode, useContext, useState} from "react";
import {appAuth} from "../../firebase/firebase";


type UserInfo = {
    fullName: string;
    email: string;
    password: string;
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
    const [user, setUser] = useState<User>(() => {
        const saved = localStorage.getItem('curUser')
        return saved ? JSON.parse(saved) : null
    })

    function login(email: string, password: string) {
        const raw = localStorage.getItem("users")
        const usersInfo: UserInfo[] = raw ? JSON.parse(raw) : []

        for (const userInfo of usersInfo) {
            if (userInfo.email === email) {
                if (userInfo.password === password) {
                    setUser(userInfo)
                    localStorage.setItem('curUser', JSON.stringify(userInfo))
                    return
                }
                else throw new Error ("The password is wrong!")
            }
        }
        throw new Error ("Email does not exist!")
    }

    function logout() {
        localStorage.removeItem('curUser')
        setUser(null)
    }

    function signup(fullName: string, email: string, password: string) {
        const raw = localStorage.getItem("users")
        const users: UserInfo[] = raw ? JSON.parse(raw) : []
        const curUser: User = {fullName, email, password}

        if (users && users.length != 0 && users.some(user => user.email === curUser.email)) {
            throw new Error ("Email already exists!")
        }
        users.push(curUser)
        setUser(curUser)

        localStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem('curUser', JSON.stringify(curUser))
    }

    const isAuthenticated = !!user

    return (
        <AuthCxt.Provider value={{user, login, logout, signup, isAuthenticated}}>
            {children}
        </AuthCxt.Provider>
    )

}

export function useAuth() {
    const ctx = useContext(AuthCxt)
    if (!ctx) throw new Error("AuthCxt is null");
    return ctx
}

//
// //TODO: inside auth provider: ....
// const [loading, setLoading] = useState(false)