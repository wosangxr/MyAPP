import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi";

export default function Card({ title, value, icon: Icon, color = "var(--color-primary)", delay = 0 }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="card"
      style={{
        padding: "24px",
        minWidth: 220,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer"
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: color,
        }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{
          padding: 10,
          borderRadius: 12,
          background: "var(--bg-primary)",
          border: "1px solid var(--border-color)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Icon size={24} color={color} />
        </div>
        <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 0.5, delay }}>
          <FiTrendingUp size={20} color="var(--color-success)" />
        </motion.div>
      </div>

      <h3 style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8, letterSpacing: 1 }}>
        {title.toUpperCase()}
      </h3>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.2 }}
        style={{
          fontSize: 40,
          fontWeight: 800,
          color: "var(--text-primary)"
        }}
      >
        {value}
      </motion.h1>

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <span style={{ fontSize: 12, color: "var(--color-success)" }}>↑ +12%</span>
        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>from last month</span>
      </div>
    </motion.div>
  );
}