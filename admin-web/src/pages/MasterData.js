import { useState } from "react";
import { FiSearch, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import Table from "../components/Table";

export default function MasterData() {
  const [activeTab, setActiveTab] = useState("categories");
  const [searchTerm, setSearchTerm] = useState("");

  const [categories, setCategories] = useState([
    { id: 1, name: "Software Development", jobs: 120, status: "Active" },
    { id: 2, name: "Marketing", jobs: 85, status: "Active" },
  ]);

  const [skills, setSkills] = useState([
    { id: 1, name: "ReactJS", category: "Software Development", uses: 450 },
    { id: 2, name: "SEO", category: "Marketing", uses: 210 },
  ]);

  const renderContent = () => {
    if (activeTab === "categories") {
      return (
        <Table 
          columns={["Name", "Jobs", "Status"]}
          data={categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))}
          renderAction={() => (
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button style={{ background: "rgba(115, 103, 240, 0.1)", color: "var(--color-primary)", border: "1px solid var(--color-primary)", padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}><FiEdit2 /></button>
              <button style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--color-danger)", border: "1px solid var(--color-danger)", padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}><FiTrash2 /></button>
            </div>
          )}
        />
      );
    }
    if (activeTab === "skills") {
      return (
        <Table 
          columns={["Name", "Category", "Uses"]}
          data={skills.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))}
          renderAction={() => (
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button style={{ background: "rgba(115, 103, 240, 0.1)", color: "var(--color-primary)", border: "1px solid var(--color-primary)", padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}><FiEdit2 /></button>
              <button style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--color-danger)", border: "1px solid var(--color-danger)", padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}><FiTrash2 /></button>
            </div>
          )}
        />
      );
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Master Data</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Manage global categories, skills, and locations</p>
        </div>
        <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FiPlus /> Add New
        </button>
      </div>

      <div style={{ display: "flex", gap: 16, borderBottom: "1px solid var(--border-color)", marginBottom: 24 }}>
        <button onClick={() => setActiveTab("categories")} style={{ padding: "12px 24px", background: "transparent", border: "none", borderBottom: activeTab === "categories" ? "2px solid var(--color-primary)" : "2px solid transparent", color: activeTab === "categories" ? "var(--color-primary)" : "var(--text-secondary)", fontWeight: activeTab === "categories" ? 600 : 500, cursor: "pointer", fontSize: 16 }}>
          Job Categories
        </button>
        <button onClick={() => setActiveTab("skills")} style={{ padding: "12px 24px", background: "transparent", border: "none", borderBottom: activeTab === "skills" ? "2px solid var(--color-primary)" : "2px solid transparent", color: activeTab === "skills" ? "var(--color-primary)" : "var(--text-secondary)", fontWeight: activeTab === "skills" ? 600 : 500, cursor: "pointer", fontSize: 16 }}>
          Skills Dictionary
        </button>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
        <FiSearch color="var(--text-secondary)" size={20} />
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 14 }} />
      </div>

      {renderContent()}
    </div>
  );
}
