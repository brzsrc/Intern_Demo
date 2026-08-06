// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, initializeAuth, indexedDBLocalPersistence} from "firebase/auth";
import { Capacitor } from '@capacitor/core';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN42HMk-HYSeYfBWgnxQ_eDGSQ82MEdO8",
  authDomain: "intern-demo-d15c0.firebaseapp.com",
  projectId: "intern-demo-d15c0",
  storageBucket: "intern-demo-d15c0.firebasestorage.app",
  messagingSenderId: "245768105563",
  appId: "1:245768105563:web:1b0e7b6bc5b281ee70197e",
  measurementId: "G-YBL9MZKEKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// const appAuth = getAuth(app);

const appAuth = Capacitor.isNativePlatform()
  ? initializeAuth(app, { persistence: indexedDBLocalPersistence })
  : getAuth(app);


export { app, appAuth };