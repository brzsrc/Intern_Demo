import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {appAuth} from "./firebase";



export function doSignInWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(appAuth, email, password);
}

export function doCreateUserWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(appAuth, email, password);
}

export function doSignOut() {
    return appAuth.signOut();
}

appAuth.onAuthStateChanged()