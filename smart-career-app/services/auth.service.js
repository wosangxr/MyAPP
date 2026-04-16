import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../lib/firebase";

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const register = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Google Login (ใช้กับ Expo)
export const googleLogin = async (idToken) => {
  const credential = GoogleAuthProvider.credential(idToken);
  return signInWithCredential(auth, credential);
};

// Phone Login
export const phoneLogin = (phone, appVerifier) =>
  signInWithPhoneNumber(auth, phone, appVerifier);
