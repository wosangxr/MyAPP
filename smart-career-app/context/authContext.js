import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
  API_URL,
} from "../lib/firebase";

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // ฟังการเปลี่ยนแปลง auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Sync กับ backend
        await syncUserWithBackend(firebaseUser);
      } else {
        setUser(null);
        setDbUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync user กับ MongoDB ผ่าน backend
  const syncUserWithBackend = async (firebaseUser, extraData = {}) => {
    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(extraData),
      });

      if (response.ok) {
        const data = await response.json();
        setDbUser(data.user);
        return data.user;
      }
    } catch (err) {
      console.log("Backend sync error (server may be offline):", err.message);
    }
    return null;
  };

  // Login ด้วย Email/Password
  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAuthLoading(false);
      return true;
    } catch (err) {
      console.error("Login error:", err.code, err.message);
      setAuthLoading(false);
      return false;
    }
  };

  // Sign Up ด้วย Email/Password
  const register = async (email, password, profileData = {}) => {
    setAuthLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // ส่งข้อมูลเพิ่มเติมไป backend
      await syncUserWithBackend(result.user, profileData);
      setAuthLoading(false);
      return true;
    } catch (err) {
      console.error("Register error:", err.code, err.message);
      setAuthLoading(false);
      return false;
    }
  };

  // Social Login — ใช้ได้กับ Google, Facebook, GitHub
  const socialLogin = async (provider) => {
    setAuthLoading(true);
    try {
      // Note: สำหรับ React Native/Expo ต้องใช้ expo-auth-session
      // หรือ signInWithRedirect สำหรับ web
      // ตอนนี้ใช้ mock สำหรับ mobile เพราะ signInWithPopup ใช้ได้แค่ web
      let selectedProvider;
      switch (provider) {
        case "Google":
          selectedProvider = googleProvider;
          break;
        case "GitHub":
          selectedProvider = githubProvider;
          break;
        case "Facebook":
          selectedProvider = facebookProvider;
          break;
        case "LINE":
          selectedProvider = new OAuthProvider("oidc.line");
          break;
        default:
          selectedProvider = googleProvider;
      }

      // สำหรับ Expo/React Native ใช้ signInWithCredential
      // ต้อง config expo-auth-session ให้ตรง provider
      // Fallback: Demo mode
      console.log(`Social login with ${provider} — configure expo-auth-session for production`);

      // Demo social login สำหรับ development
      const demoEmail = `user@${provider.toLowerCase()}.com`;
      try {
        // Try sign in first
        await signInWithEmailAndPassword(auth, demoEmail, "demo123456");
      } catch {
        // If user doesn't exist, create one
        try {
          await createUserWithEmailAndPassword(auth, demoEmail, "demo123456");
        } catch (e) {
          // User might already exist with different auth
          console.log("Social login demo:", e.message);
        }
      }

      setAuthLoading(false);
      return true;
    } catch (err) {
      console.error("Social login error:", err);
      setAuthLoading(false);
      return false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Get token สำหรับ API calls
  const getToken = async () => {
    if (!user) return null;
    try {
      return await user.getIdToken();
    } catch {
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user, // Firebase user object
        dbUser, // MongoDB user data
        login,
        register,
        socialLogin,
        logout,
        getToken,
        loading, // true ระหว่าง initial auth check
        authLoading, // true ระหว่าง login/register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
