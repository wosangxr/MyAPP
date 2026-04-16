import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1433 100%)"
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{
          width: 50,
          height: 50,
          border: "3px solid rgba(59,130,246,0.2)",
          borderTop: "3px solid #3b82f6",
          borderRadius: "50%"
        }}
      />
    </div>
  );
}