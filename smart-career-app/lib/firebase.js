// ── Firebase Web SDK Configuration ──
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuXIu9TxTTkVzm1N5NOV2x558LWEtRwDQ",
  authDomain: "project-app-75386.firebaseapp.com",
  projectId: "project-app-75386",
  storageBucket: "project-app-75386.firebasestorage.app",
  messagingSenderId: "28006691314",
  appId: "1:28006691314:web:5cc4095bd9fe4038117b6b",
  measurementId: "G-TXC1FJ0PSM",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
// LINE ใช้ Custom OIDC — ต้อง config เพิ่มใน Firebase Console
export const lineProvider = new OAuthProvider("oidc.line");

// Backend API URL
export const API_URL = "http://localhost:3001/api";

export default app;
