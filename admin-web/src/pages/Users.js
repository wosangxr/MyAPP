import { useState } from "react";
import { FiSearch, FiShieldOff, FiRefreshCw, FiCheckCircle } from "react-icons/fi";
import Table from "../components/Table";

export default function Users() {
  const [activeTab, setActiveTab] = useState("seekers");
  const [searchTerm, setSearchTerm] = useState("");

  const [jobSeekers, setJobSeekers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "081-234-5678", joined: "2026-04-10", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "089-876-5432", joined: "2026-04-12", status: "Banned" },
  ]);

  const [employers, setEmployers] = useState([
    { id: 1, company: "Tech Flow Co.", email: "hr@techflow.com", doc: "DBD_Cert.pdf", status: "Verified", isVip: true },
    { id: 2, company: "Creative Hub", email: "hello@creative.com", doc: "Pending_doc.pdf", status: "Pending", isVip: false },
  ]);

  const filteredSeekers = jobSeekers.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredEmployers = employers.filter(e => e.company.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>User Management</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Manage Job Seekers and Employers</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 16, borderBottom: "1px solid var(--border-color)", marginBottom: 24 }}>
        <button 
          onClick={() => setActiveTab("seekers")}
          style={{ 
            padding: "12px 24px", 
            background: "transparent", 
            border: "none", 
            borderBottom: activeTab === "seekers" ? "2px solid var(--color-primary)" : "2px solid transparent",
            color: activeTab === "seekers" ? "var(--color-primary)" : "var(--text-secondary)",
            fontWeight: activeTab === "seekers" ? 600 : 500,
            cursor: "pointer",
            fontSize: 16
          }}
        >
          Job Seekers
        </button>
        <button 
          onClick={() => setActiveTab("employers")}
          style={{ 
            padding: "12px 24px", 
            background: "transparent", 
            border: "none", 
            borderBottom: activeTab === "employers" ? "2px solid var(--color-primary)" : "2px solid transparent",
            color: activeTab === "employers" ? "var(--color-primary)" : "var(--text-secondary)",
            fontWeight: activeTab === "employers" ? 600 : 500,
            cursor: "pointer",
            fontSize: 16
          }}
        >
          Employers
        </button>
      </div>

      {/* Search */}
      <div className="card" style={{ padding: 16, marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
        <FiSearch color="var(--text-secondary)" size={20} />
        <input
          type="text"
          placeholder={`Search ${activeTab === "seekers" ? "names" : "companies"}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text-primary)",
            fontSize: 14
          }}
        />
      </div>

      {/* Table Area */}
      {activeTab === "seekers" ? (
        <Table 
          columns={["Name", "Email", "Phone", "Joined", "Status"]}
          data={filteredSeekers}
          renderAction={(row) => (
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--color-danger)", border: "1px solid var(--color-danger)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <FiShieldOff /> Ban
              </button>
              <button style={{ background: "rgba(115, 103, 240, 0.1)", color: "var(--color-primary)", border: "1px solid var(--color-primary)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <FiRefreshCw /> Reset Pass
              </button>
            </div>
          )}
        />
      ) : (
        <Table 
          columns={["Company", "Email", "Doc", "Status"]}
          data={filteredEmployers}
          renderAction={(row) => (
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              {row.status === "Pending" && (
                <button style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--color-success)", border: "1px solid var(--color-success)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <FiCheckCircle /> Approve
                </button>
              )}
              {row.status === "Verified" && !row.isVip && (
                <button style={{ background: "rgba(245, 158, 11, 0.1)", color: "var(--color-warning)", border: "1px solid var(--color-warning)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  Make VIP
                </button>
              )}
            </div>
          )}
        />
      )}
    </div>
  );
}