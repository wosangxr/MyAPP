// ── Firebase Web SDK for Admin Web ──
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// 🔧 ใส่ค่าจาก Firebase Console → Project Settings → General → Web app
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Backend API
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

// Helper functions
export const firebaseSignIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const firebaseSignInWithGoogle = () =>
  signInWithPopup(auth, googleProvider);

export const firebaseSignInWithGithub = () =>
  signInWithPopup(auth, githubProvider);

export const firebaseSignInWithFacebook = () =>
  signInWithPopup(auth, facebookProvider);

export const firebaseSignOut = () => signOut(auth);

export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);

export default app;
