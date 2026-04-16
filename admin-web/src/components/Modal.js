import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(5px)",
              zIndex: 999
            }}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(15, 20, 51, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: 20,
              padding: 24,
              width: "90%",
              maxWidth: 500,
              zIndex: 1000
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600 }}>{title}</h3>
              <button onClick={onClose} style={{ background: "none", border: "none", color: "#a0aec0", cursor: "pointer" }}>
                <FiX size={24} />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}