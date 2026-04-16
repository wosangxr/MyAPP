import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Table from "../components/Table";

export default function Support() {
  const [activeTab, setActiveTab] = useState("messages");
  const [searchTerm, setSearchTerm] = useState("");

  const [messages, setMessages] = useState([
    { id: 1, from: "john@example.com", subject: "Cannot login to my account", date: "2026-04-16", status: "Unread" },
  ]);

  const [reports, setReports] = useState([
    { id: 1, reporter: "jane@example.com", target: "Job #4521 - Easy Money", reason: "Spam", status: "Pending" },
  ]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Support & Reports</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Handle user issues and abuse reports</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, borderBottom: "1px solid var(--border-color)", marginBottom: 24 }}>
        <button onClick={() => setActiveTab("messages")} style={{ padding: "12px 24px", background: "transparent", border: "none", borderBottom: activeTab === "messages" ? "2px solid var(--color-primary)" : "2px solid transparent", color: activeTab === "messages" ? "var(--color-primary)" : "var(--text-secondary)", fontWeight: activeTab === "messages" ? 600 : 500, cursor: "pointer", fontSize: 16 }}>
          Contact Messages
        </button>
        <button onClick={() => setActiveTab("reports")} style={{ padding: "12px 24px", background: "transparent", border: "none", borderBottom: activeTab === "reports" ? "2px solid var(--color-primary)" : "2px solid transparent", color: activeTab === "reports" ? "var(--color-primary)" : "var(--text-secondary)", fontWeight: activeTab === "reports" ? 600 : 500, cursor: "pointer", fontSize: 16 }}>
          Abuse Reports
        </button>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
        <FiSearch color="var(--text-secondary)" size={20} />
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 14 }} />
      </div>

      {activeTab === "messages" ? (
        <Table 
          columns={["From", "Subject", "Date", "Status"]}
          data={messages.filter(m => m.subject.toLowerCase().includes(searchTerm.toLowerCase()))}
          renderAction={() => (
             <button style={{ background: "rgba(115, 103, 240, 0.1)", color: "var(--color-primary)", border: "1px solid var(--color-primary)", padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}>
               Reply
             </button>
          )}
        />
      ) : (
        <Table 
          columns={["Reporter", "Target", "Reason", "Status"]}
          data={reports.filter(r => r.target.toLowerCase().includes(searchTerm.toLowerCase()))}
          renderAction={() => (
             <button style={{ background: "rgba(245, 158, 11, 0.1)", color: "var(--color-warning)", border: "1px solid var(--color-warning)", padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}>
               Review
             </button>
          )}
        />
      )}
    </div>
  );
}
