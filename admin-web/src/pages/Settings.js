import { useState } from "react";
import { FiUsers, FiGlobe, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import Table from "../components/Table";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("team");

  // Mock data for Admin team
  const [team, setTeam] = useState([
    { id: 1, name: "Admin One", email: "admin1@helpapp.com", role: "Super Admin", status: "Active" },
    { id: 2, name: "Support Two", email: "support2@helpapp.com", role: "Moderator", status: "Active" },
  ]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>System Settings</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Manage platform settings, team members, and permissions</p>
        </div>
        {activeTab === "team" && (
          <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FiPlus /> Add Admin
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: 16, borderBottom: "1px solid var(--border-color)", marginBottom: 24 }}>
        <button onClick={() => setActiveTab("team")} style={{ padding: "12px 24px", background: "transparent", border: "none", borderBottom: activeTab === "team" ? "2px solid var(--color-primary)" : "2px solid transparent", color: activeTab === "team" ? "var(--color-primary)" : "var(--text-secondary)", fontWeight: activeTab === "team" ? 600 : 500, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <FiUsers /> Team Management
        </button>
        <button onClick={() => setActiveTab("general")} style={{ padding: "12px 24px", background: "transparent", border: "none", borderBottom: activeTab === "general" ? "2px solid var(--color-primary)" : "2px solid transparent", color: activeTab === "general" ? "var(--color-primary)" : "var(--text-secondary)", fontWeight: activeTab === "general" ? 600 : 500, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <FiGlobe /> General
        </button>
      </div>

      {activeTab === "team" ? (
        <Table 
          columns={["Name", "Email", "Role", "Status"]}
          data={team}
          renderAction={() => (
             <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button style={{ background: "rgba(115, 103, 240, 0.1)", color: "var(--color-primary)", border: "1px solid var(--color-primary)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <FiEdit2 /> Edit
              </button>
              <button style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--color-danger)", border: "1px solid var(--color-danger)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <FiTrash2 /> Remove
              </button>
            </div>
          )}
        />
      ) : (
        <div className="card" style={{ padding: 24, maxWidth: 600 }}>
           <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "var(--text-primary)" }}>Platform Name</label>
              <input type="text" defaultValue="HelpAPP Admin Dashboard" style={{ width: "100%", padding: 12, borderRadius: 8, background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", outline: "none" }} />
           </div>
           <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "var(--text-primary)" }}>Support Email</label>
              <input type="email" defaultValue="support@helpapp.com" style={{ width: "100%", padding: 12, borderRadius: 8, background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", outline: "none" }} />
           </div>
           
           <button className="btn-primary" style={{ marginTop: 10 }}>Save Settings</button>
        </div>
      )}
    </div>
  );
}