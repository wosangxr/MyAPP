import { useEffect, useState } from "react";
import { FiUsers, FiBriefcase, FiHome, FiDollarSign, FiTrendingUp, FiClock } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Table from "../components/Table";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, jobs: 0, companies: 0, revenue: 0 });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        users: 15420,
        jobs: 324,
        companies: 150,
        revenue: 1250000
      });
      setRecentActivities([
        { id: 1, title: "Frontend Developer", company: "Tech Flow", date: "2026-04-16", status: "pending" },
        { id: 2, title: "Marketing Manager", company: "Biz Co.", date: "2026-04-15", status: "approved" },
        { id: 3, title: "UX/UI Designer", company: "Creative Hub", date: "2026-04-15", status: "rejected" },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const monthlyData = [
    { name: "Jan", applications: 120, jobs: 40 },
    { name: "Feb", applications: 150, jobs: 55 },
    { name: "Mar", applications: 200, jobs: 80 },
    { name: "Apr", applications: 180, jobs: 60 },
    { name: "May", applications: 250, jobs: 100 },
    { name: "Jun", applications: 300, jobs: 120 }
  ];

  const pieData = [
    { name: "IT & Software", value: 40, color: "#7367F0" },
    { name: "Marketing", value: 25, color: "#10B981" },
    { name: "Design", value: 20, color: "#F59E0B" },
    { name: "Others", value: 15, color: "#EF4444" }
  ];

  if (loading) return <Loading />;

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 700 }}>Dashboard Overview</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 32 }}>
        <Card title="Total Users" value={stats.users.toLocaleString()} icon={FiUsers} color="var(--color-primary)" />
        <Card title="Active Companies" value={stats.companies.toLocaleString()} icon={FiHome} color="var(--color-success)" />
        <Card title="Pending Jobs" value={stats.jobs} icon={FiBriefcase} color="var(--color-warning)" />
        <Card title="Revenue (THB)" value={`฿${stats.revenue.toLocaleString()}`} icon={FiDollarSign} color="var(--color-danger)" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24, marginBottom: 32 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 18, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
            <FiTrendingUp color="var(--color-primary)"/> Job Application Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip contentStyle={{ background: "var(--bg-surface)", borderColor: "var(--border-color)", borderRadius: 8, color: "var(--text-primary)" }} />
              <Line type="monotone" dataKey="applications" stroke="var(--color-primary)" strokeWidth={3} dot={{ fill: "var(--color-primary)", r: 4 }} />
              <Line type="monotone" dataKey="jobs" stroke="var(--color-success)" strokeWidth={3} dot={{ fill: "var(--color-success)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 18, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
            <FiTrendingUp color="var(--color-primary)"/> Popular Industries
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--bg-surface)", borderColor: "var(--border-color)", borderRadius: 8, color: "var(--text-primary)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 18, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <FiClock color="var(--color-primary)"/> Recent Posted Jobs
        </h3>
        <Table 
          columns={["Title", "Company", "Date", "Status"]}
          data={recentActivities}
          renderAction={(row) => (
            <span style={{
              padding: "4px 12px",
              borderRadius: 20,
              background: row.status === "pending" ? "rgba(245, 158, 11, 0.1)" :
                          row.status === "approved" ? "rgba(16, 185, 129, 0.1)" :
                          "rgba(239, 68, 68, 0.1)",
              color: row.status === "pending" ? "var(--color-warning)" :
                     row.status === "approved" ? "var(--color-success)" : "var(--color-danger)",
              fontSize: 12,
              fontWeight: 600
            }}>
              {row.status.toUpperCase()}
            </span>
          )}
        />
      </div>
    </div>
  );
}