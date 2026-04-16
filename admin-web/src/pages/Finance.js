import { useState } from "react";
import { FiSearch, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import Table from "../components/Table";

export default function Finance() {
  const [activeTab, setActiveTab] = useState("packages");
  const [searchTerm, setSearchTerm] = useState("");

  const [packages, setPackages] = useState([
    { id: 1, name: "Basic Plan", features: "10 Jobs, 50 applicants", price: "฿990 / month", status: "Active" },
    { id: 2, name: "Pro Plan", features: "Unlimited Jobs, VIP Badge", price: "฿2,990 / month", status: "Active" },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, company: "Tech Flow", plan: "Pro Plan", amount: "฿2,990", date: "2026-04-15", status: "Completed" },
    { id: 2, company: "DevStudio", plan: "Basic Plan", amount: "฿990", date: "2026-04-10", status: "Completed" },
  ]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Finance & Subscriptions</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Manage pricing plans and payment history</p>
        </div>
        {activeTab === "packages" && (
          <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FiPlus /> Add Package
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: 16, borderBottom: "1px solid var(--border-color)", marginBottom: 24 }}>
        <button onClick={() => setActiveTab("packages")} style={{ padding: "12px 24px", background: "transparent", border: "none", borderBottom: activeTab === "packages" ? "2px solid var(--color-primary)" : "2px solid transparent", color: activeTab === "packages" ? "var(--color-primary)" : "var(--text-secondary)", fontWeight: activeTab === "packages" ? 600 : 500, cursor: "pointer", fontSize: 16 }}>
          Subscription Packages
        </button>
        <button onClick={() => setActiveTab("transactions")} style={{ padding: "12px 24px", background: "transparent", border: "none", borderBottom: activeTab === "transactions" ? "2px solid var(--color-primary)" : "2px solid transparent", color: activeTab === "transactions" ? "var(--color-primary)" : "var(--text-secondary)", fontWeight: activeTab === "transactions" ? 600 : 500, cursor: "pointer", fontSize: 16 }}>
          Transaction Logs
        </button>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
        <FiSearch color="var(--text-secondary)" size={20} />
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 14 }} />
      </div>

      {activeTab === "packages" ? (
        <Table 
          columns={["Name", "Features", "Price", "Status"]}
          data={packages.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))}
          renderAction={(row) => (
             <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button style={{ background: "rgba(115, 103, 240, 0.1)", color: "var(--color-primary)", border: "1px solid var(--color-primary)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <FiEdit2 /> Edit
              </button>
              <button style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--color-danger)", border: "1px solid var(--color-danger)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <FiTrash2 /> Delete
              </button>
            </div>
          )}
        />
      ) : (
        <Table 
          columns={["Company", "Plan", "Amount", "Date", "Status"]}
          data={transactions.filter(t => t.company.toLowerCase().includes(searchTerm.toLowerCase()))}
        />
      )}
    </div>
  );
}
