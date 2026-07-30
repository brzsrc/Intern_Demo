import axios from "axios";
import {appAuth} from "../firebase/firebase";


export const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
})

api.interceptors.request.use(
    async config => {
        const user = appAuth.currentUser
        if (user) {
            const token = await user.getIdToken()
            config.headers.Authorization = 'Bearer ' + token
        }
        return config;
    }
)