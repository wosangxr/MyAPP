import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onAuthChange } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check for hardcoded mock admin bypass first
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userStr = localStorage.getItem("user");
    let isMockAdmin = false;
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role === "admin" && user.email === "admin@email.com") {
           isMockAdmin = true;
        }
      } catch (e) {}
    }

    // If mock admin is present in localStorage, bypass Firebase check
    if (isMockAdmin && isLoggedIn) {
      setIsAuth(true);
      setChecking(false);
      return; // Do not setup Firebase observer
    }

    const unsubscribe = onAuthChange((user) => {
      if (user) {
        // ตรวจสอบว่ามี login state ใน localStorage
        const isLoggedInLocal = localStorage.getItem("isLoggedIn") === "true";
        setIsAuth(isLoggedInLocal);
      } else {
        setIsAuth(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          fontSize: 16,
        }}
      >
        กำลังตรวจสอบสิทธิ์...
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}