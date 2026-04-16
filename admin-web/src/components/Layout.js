import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useTheme } from "../theme";

export default function Layout({ children }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-primary)", transition: "background 0.3s ease, color 0.3s ease" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <main style={{ padding: "0 32px 32px", overflowX: "hidden", overflowY: "auto", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
