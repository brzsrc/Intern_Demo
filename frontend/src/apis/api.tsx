import axios from "axios";
import {appAuth} from "../firebase/firebase";
import { Capacitor } from '@capacitor/core';

const BASE_URL =
  (Capacitor.getPlatform() === 'android'
    ? 'http://10.0.2.2:8000'                 // Android 模拟器
    : 'http://localhost:8000');              // iOS 模拟器 / 浏览器

export const api = axios.create({
    // baseURL: 'http://localhost:8000/api/',
    // baseURL: 'http://10.0.2.2:8000/api/',
    baseURL: `${BASE_URL}/api/`,
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