import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  firebaseSignIn,
  API_URL,
} from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync user กับ backend + เช็ค admin role
  const syncAndCheckAdmin = async (user) => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user && data.user.role === "admin") {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isLoggedIn", "true");
          return true;
        } else {
          setError("คุณไม่มีสิทธิ์เข้าถึงระบบ Admin");
          return false;
        }
      }
    } catch (err) {
      console.log("Backend sync error:", err.message);
      // If backend is offline, allow login by admin email check
      const adminEmail = "admin@helpapp.com";
      if (user.email === adminEmail) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            name: user.displayName || user.email,
            role: "admin",
          })
        );
        localStorage.setItem("isLoggedIn", "true");
        return true;
      }
      setError("ไม่สามารถตรวจสอบสิทธิ์ได้");
      return false;
    }
    return false;
  };

  // Email/Password Login
  const handleLogin = async () => {
    if (!email || !password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    // Hardcoded Admin Login
    if (email === "admin@email.com" && password === "123456") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: "admin@email.com",
          name: "Admin User",
          role: "admin",
        })
      );
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await firebaseSignIn(email, password);
      const isAdmin = await syncAndCheckAdmin(result.user);
      if (isAdmin) {
        navigate("/dashboard");
      }
      setLoading(false);
    } catch (err) {
      console.error("Login error:", err);
      const msg =
        err.code === "auth/user-not-found"
          ? "ไม่พบอีเมลนี้ในระบบ"
          : err.code === "auth/wrong-password"
          ? "รหัสผ่านไม่ถูกต้อง"
          : err.code === "auth/invalid-email"
          ? "รูปแบบอีเมลไม่ถูกต้อง"
          : "เข้าสู่ระบบไม่สำเร็จ";
      setError(msg);
      setLoading(false);
    }
  };


  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1433 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 70%)",
          top: "10%",
          right: "10%",
        }}
      />

      <motion.div
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)",
          bottom: "10%",
          left: "10%",
        }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: 450,
          padding: 40,
          borderRadius: 30,
          background: "rgba(15, 20, 51, 0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{
              width: 80,
              height: 80,
              margin: "0 auto 20px",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
            }}
          >
            💼
          </motion.div>
          <h2
            className="text-gradient"
            style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}
          >
            Admin Login
          </h2>
          <p style={{ color: "#a0aec0", fontSize: 14 }}>
            เข้าสู่ระบบเพื่อจัดการแพลตฟอร์ม
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "rgba(239,68,68,0.2)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 10,
              padding: 12,
              marginBottom: 20,
              color: "#ef4444",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            {error}
          </motion.div>
        )}

        {/* Email/Password */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(59,130,246,0.2)",
              marginBottom: 16,
              transition: "all 0.3s ease",
            }}
          >
            <FiMail color="#3b82f6" size={20} />
            <input
              type="email"
              placeholder="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: 14,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(59,130,246,0.2)",
              transition: "all 0.3s ease",
            }}
          >
            <FiLock color="#3b82f6" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: 14,
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: "none",
                border: "none",
                color: "#a0aec0",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          disabled={loading}
          className="btn-primary"
          style={{
            width: "100%",
            padding: "14px",
            fontSize: 16,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 20,
          }}
        >
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          <FiLogIn size={18} />
        </motion.button>



        <div style={{ textAlign: "center", fontSize: 12, color: "#a0aec0" }}>
          🔒 เฉพาะ Admin เท่านั้นที่เข้าถึงได้
        </div>
      </motion.div>
    </div>
  );
}