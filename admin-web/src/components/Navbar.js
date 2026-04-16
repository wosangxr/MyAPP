import { motion } from "framer-motion";
import { FiSun, FiMoon, FiBell, FiUser, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ toggleTheme, isDarkMode }) {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-color)",
        marginBottom: 20,
        position: "sticky",
        top: 0,
        zIndex: 100
      }}
    >
      {/* Global Search */}
      <div style={{ display: "flex", alignItems: "center", background: "var(--bg-primary)", padding: "10px 16px", borderRadius: 12, width: 350, border: "1px solid var(--border-color)" }}>
        <FiSearch color="var(--text-secondary)" size={18} />
        <input 
          type="text" 
          placeholder="ค้นหาชื่อคน, บริษัท, ทักษะ..." 
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            color: "var(--text-primary)",
            marginLeft: 10,
            flex: 1,
            fontSize: 14
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          style={{ padding: 10, borderRadius: 10, background: "transparent", border: "1px solid var(--border-color)", color: "var(--text-primary)", cursor: "pointer" }}
        >
          {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </motion.button>

        <div style={{ position: "relative" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: 10,
              borderRadius: 10,
              background: "transparent",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              cursor: "pointer",
              position: "relative"
            }}
          >
            <FiBell size={20} />
            <span style={{
              position: "absolute",
              top: 5,
              right: 5,
              width: 8,
              height: 8,
              background: "var(--color-danger)",
              borderRadius: "50%"
            }} />
          </motion.button>
        </div>

        <div style={{ position: "relative" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              padding: 8,
              borderRadius: 10,
              background: "var(--color-primary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "none"
            }}
          >
            <span style={{color: "#fff", fontWeight: 600, fontSize: 14, marginLeft: 8}}>{user.name || "Admin"}</span>
            <FiUser size={20} color="white" />
          </motion.button>
          
          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: "absolute",
                top: 50,
                right: 0,
                background: "var(--bg-surface)",
                border: "1px solid var(--border-color)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                borderRadius: 12,
                padding: 8,
                minWidth: 150
              }}
            >
              <button onClick={() => { navigate("/profile"); setShowUserMenu(false); }} style={{
                display: "block",
                width: "100%",
                padding: "8px 16px",
                textAlign: "left",
                background: "transparent",
                border: "none",
                color: "var(--text-primary)",
                cursor: "pointer",
                borderRadius: 8
              }}>
                Profile
              </button>
              <button onClick={logout} style={{
                display: "block",
                width: "100%",
                padding: "8px 16px",
                textAlign: "left",
                background: "transparent",
                border: "none",
                color: "var(--color-danger)",
                cursor: "pointer",
                borderRadius: 8
              }}>
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}