import { useState } from "react";
import { FiSearch, FiCheckCircle, FiXCircle, FiTrendingDown, FiTrash2 } from "react-icons/fi";
import Table from "../components/Table";

export default function Jobs() {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");

  const [pendingJobs, setPendingJobs] = useState([
    { id: 1, title: "Backend Engineer", company: "DevStudio", salary: "฿50,000 - ฿80,000", posted: "2026-04-16" },
  ]);

  const [activeJobs, setActiveJobs] = useState([
    { id: 2, title: "Frontend Developer", company: "Tech Flow", views: 120, applicants: 15 },
    { id: 3, title: "Marketing Manager", company: "Biz Co.", views: 340, applicants: 22 },
  ]);

  const [reportedJobs, setReportedJobs] = useState([
    { id: 4, title: "Easy Money Work From Home", company: "Unknown", reason: "Scam / Pyramid Scheme", reports: 12 },
  ]);

  const renderContent = () => {
    if (activeTab === "pending") {
      const filtered = pendingJobs.filter(j => j.title.toLowerCase().includes(searchTerm.toLowerCase()));
      return (
        <Table 
          columns={["Title", "Company", "Salary", "Posted"]}
          data={filtered}
          renderAction={(row) => (
             <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--color-success)", border: "1px solid var(--color-success)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <FiCheckCircle /> Approve
              </button>
              <button style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--color-danger)", border: "1px solid var(--color-danger)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <FiXCircle /> Reject
              </button>
            </div>
          )}
        />
      );
    }
    if (activeTab === "active") {
      const filtered = activeJobs.filter(j => j.title.toLowerCase().includes(searchTerm.toLowerCase()));
      return (
        <Table 
          columns={["Title", "Company", "Views", "Applicants"]}
          data={filtered}
        />
      );
    }
    if (activeTab === "reported") {
      const filtered = reportedJobs.filter(j => j.title.toLowerCase().includes(searchTerm.toLowerCase()));
      return (
        <Table 
          columns={["Title", "Company", "Reason", "Reports"]}
          data={filtered}
          renderAction={(row) => (
             <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button style={{ background: "rgba(245, 158, 11, 0.1)", color: "var(--color-warning)", border: "1px solid var(--color-warning)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <FiTrendingDown /> Take Down
              </button>
              <button style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--color-danger)", border: "1px solid var(--color-danger)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <FiTrash2 /> Ban Company
              </button>
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
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Job Management</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Review and manage job postings</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, borderBottom: "1px solid var(--border-color)", marginBottom: 24, overflowX: "auto" }}>
        <button onClick={() => setActiveTab("pending")} style={{ padding: "12px 24px", background: "transparent", border: "none", borderBottom: activeTab === "pending" ? "2px solid var(--color-primary)" : "2px solid transparent", color: activeTab === "pending" ? "var(--color-primary)" : "var(--text-secondary)", fontWeight: activeTab === "pending" ? 600 : 500, cursor: "pointer", fontSize: 16, whiteSpace: "nowrap" }}>
          Pending Approval ({pendingJobs.length})
        </button>
        <button onClick={() => setActiveTab("active")} style={{ padding: "12px 24px", background: "transparent", border: "none", borderBottom: activeTab === "active" ? "2px solid var(--color-primary)" : "2px solid transparent", color: activeTab === "active" ? "var(--color-primary)" : "var(--text-secondary)", fontWeight: activeTab === "active" ? 600 : 500, cursor: "pointer", fontSize: 16, whiteSpace: "nowrap" }}>
          Active Jobs ({activeJobs.length})
        </button>
        <button onClick={() => setActiveTab("reported")} style={{ padding: "12px 24px", background: "transparent", border: "none", borderBottom: activeTab === "reported" ? "2px solid var(--color-primary)" : "2px solid transparent", color: activeTab === "reported" ? "var(--color-primary)" : "var(--text-secondary)", fontWeight: activeTab === "reported" ? 600 : 500, cursor: "pointer", fontSize: 16, whiteSpace: "nowrap" }}>
          Reported Jobs ({reportedJobs.length})
        </button>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
        <FiSearch color="var(--text-secondary)" size={20} />
        <input type="text" placeholder="Search job titles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 14 }} />
      </div>

      {renderContent()}
    </div>
  );
}