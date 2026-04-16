import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiGrid, FiUsers, FiBriefcase, FiDollarSign, 
  FiDatabase, FiHeadphones, FiSettings, FiLogOut 
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: FiGrid },
    { path: "/users", name: "User Management", icon: FiUsers },
    { path: "/jobs", name: "Job Management", icon: FiBriefcase },
    { path: "/finance", name: "Finance & Subs", icon: FiDollarSign },
    { path: "/master-data", name: "Master Data", icon: FiDatabase },
    { path: "/support", name: "Support", icon: FiHeadphones },
    { path: "/settings", name: "Settings", icon: FiSettings },
  ];

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: 280,
        height: "100vh",
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ padding: "30px 24px", borderBottom: "1px solid var(--border-color)" }}>
        <motion.div whileHover={{ scale: 1.05 }} style={{
          background: "var(--color-primary)",
          padding: "12px",
          borderRadius: "12px",
          textAlign: "center",
          color: "#fff"
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2 }}>ADMIN PANEL</h2>
          <p style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>Job Board Manager</p>
        </motion.div>
      </div>

      <nav style={{ padding: "20px 16px", flex: 1, overflowY: "auto" }}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.path}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  marginBottom: 8,
                  borderRadius: 12,
                  background: isActive ? "var(--color-primary)" : "transparent",
                  color: isActive ? "#fff" : "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  fontWeight: isActive ? 600 : 500
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "var(--bg-card-hover)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }
                }}
              >
                <Icon size={20} />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={{
                      marginLeft: "auto",
                      width: 4,
                      height: 24,
                      background: "#fff",
                      borderRadius: 2
                    }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div style={{ padding: "20px 16px", borderTop: "1px solid var(--border-color)" }}>
        <button
          onClick={logout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "100%",
            padding: "12px 16px",
            borderRadius: 12,
            background: "transparent",
            border: "1px solid var(--color-danger)",
            color: "var(--color-danger)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontSize: 14,
            fontWeight: 500
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </motion.div>
  );
}