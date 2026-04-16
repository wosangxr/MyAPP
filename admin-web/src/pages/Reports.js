import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FiTrendingUp, FiUsers, FiBriefcase, FiFileText, FiDownload, 
  FiPieChart, FiBarChart2, FiActivity, FiAward,
  FiClock, FiCheckCircle, FiXCircle
} from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useTheme } from "../theme";
import { auth, API_URL } from "../firebase";

export default function Reports() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
    totalCompanies: 0,
    approvedApps: 0,
    pendingApps: 0,
    rejectedApps: 0
  });
  const [topJobs, setTopJobs] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  useEffect(() => {
    fetchStats();
    generateMonthlyData();
  }, []);

  const fetchStats = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();

      const response = await fetch(`${API_URL}/stats/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        
        setStats({
          totalUsers: data.totalUsers || 0,
          totalJobs: data.totalJobs || 0,
          totalApplications: data.totalApplications || 0,
          totalCompanies: data.totalCompanies || 0,
          // Since backend doesn't return these breakdown yet in stats/admin, 
          // we can either add them to backend or mock/derive
          approvedApps: data.totalApplications * 0.4, 
          pendingApps: data.totalApplications * 0.4,
          rejectedApps: data.totalApplications * 0.2
        });

        setTopJobs(data.topJobs || []);
      }
    } catch (err) {
      console.error("Fetch reports stats error:", err);
    }
  };

  const generateMonthlyData = () => {
    const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    setMonthlyData(months.map((m, i) => ({
      month: m,
      users: Math.floor(Math.random() * 100) + 20,
      jobs: Math.floor(Math.random() * 50) + 10,
      applications: Math.floor(Math.random() * 200) + 50
    })));
  };

  const summaryCards = [
    { title: "ผู้ใช้ทั้งหมด", value: stats.totalUsers, icon: FiUsers, color: "#3b82f6", growth: "+15%", bg: "rgba(59,130,246,0.1)" },
    { title: "งานทั้งหมด", value: stats.totalJobs, icon: FiBriefcase, color: "#10b981", growth: "+8%", bg: "rgba(16,185,129,0.1)" },
    { title: "ใบสมัคร", value: stats.totalApplications, icon: FiFileText, color: "#f59e0b", growth: "+23%", bg: "rgba(245,158,11,0.1)" },
    { title: "บริษัท", value: stats.totalCompanies, icon: FiActivity, color: "#8b5cf6", growth: "+12%", bg: "rgba(139,92,246,0.1)" }
  ];

  const applicationStats = [
    { label: "อนุมัติแล้ว", value: stats.approvedApps, percentage: stats.totalApplications > 0 ? ((stats.approvedApps / stats.totalApplications) * 100).toFixed(1) : 0, color: "#10b981", icon: FiCheckCircle },
    { label: "รอการพิจารณา", value: stats.pendingApps, percentage: stats.totalApplications > 0 ? ((stats.pendingApps / stats.totalApplications) * 100).toFixed(1) : 0, color: "#f59e0b", icon: FiClock },
    { label: "ปฏิเสธ", value: stats.rejectedApps, percentage: stats.totalApplications > 0 ? ((stats.rejectedApps / stats.totalApplications) * 100).toFixed(1) : 0, color: "#ef4444", icon: FiXCircle }
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, overflow: "auto", height: "100vh" }}>
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        
        <div style={{ padding: "20px 32px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: 30,
              flexWrap: "wrap",
              gap: 15
            }}>
              <div>
                <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, background: "linear-gradient(135deg, #fff, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  รายงานและวิเคราะห์ข้อมูล
                </h1>
                <p style={{ color: "#a0aec0", fontSize: 14 }}>
                  ติดตามประสิทธิภาพและสถิติของแพลตฟอร์ม
                </p>
              </div>
              
              <div style={{ display: "flex", gap: 12 }}>
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  style={styles.select}
                >
                  <option value="week">7 วันที่ผ่านมา</option>
                  <option value="month">30 วันที่ผ่านมา</option>
                  <option value="quarter">3 เดือนที่ผ่านมา</option>
                  <option value="year">ปีที่ผ่านมา</option>
                </select>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "10px 20px",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    border: "none",
                    borderRadius: 12,
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontWeight: 500
                  }}
                >
                  <FiDownload /> ส่งออกรายงาน
                </motion.button>
              </div>
            </div>

            {/* Summary Cards */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
              gap: 20, 
              marginBottom: 30 
            }}>
              {summaryCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    style={{
                      background: "rgba(15, 20, 51, 0.6)",
                      backdropFilter: "blur(20px)",
                      borderRadius: 20,
                      border: "1px solid rgba(59, 130, 246, 0.2)",
                      padding: 24,
                      transition: "all 0.3s"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                      <div style={{
                        padding: 12,
                        borderRadius: 12,
                        background: card.bg,
                        border: `1px solid ${card.color}40`
                      }}>
                        <Icon size={24} color={card.color} />
                      </div>
                      <span style={{ color: "#10b981", fontSize: 14, fontWeight: 600 }}>{card.growth}</span>
                    </div>
                    <h3 style={{ fontSize: 36, fontWeight: 800, marginBottom: 5 }}>{card.value.toLocaleString()}</h3>
                    <p style={{ color: "#a0aec0", fontSize: 14 }}>{card.title}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Application Status Chart */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
              gap: 20, 
              marginBottom: 30 
            }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  background: "rgba(15, 20, 51, 0.6)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 20,
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  padding: 24
                }}
              >
                <h3 style={{ fontSize: 18, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                  <FiPieChart /> สถานะใบสมัคร
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {applicationStats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <Icon size={16} color={stat.color} />
                            <span>{stat.label}</span>
                          </div>
                          <div>
                            <strong>{stat.value.toLocaleString()}</strong> ({stat.percentage}%)
                          </div>
                        </div>
                        <div style={{
                          width: "100%",
                          height: 8,
                          background: "rgba(255,255,255,0.1)",
                          borderRadius: 4,
                          overflow: "hidden"
                        }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.percentage}%` }}
                            transition={{ duration: 1, delay: idx * 0.2 }}
                            style={{
                              height: "100%",
                              background: stat.color,
                              borderRadius: 4
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Top Jobs */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                style={{
                  background: "rgba(15, 20, 51, 0.6)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 20,
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  padding: 24
                }}
              >
                <h3 style={{ fontSize: 18, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                  <FiAward /> งานที่ได้รับความนิยมสูงสุด
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                  {topJobs.length > 0 ? topJobs.map((job, idx) => (
                    <div key={idx}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 14 }}>#{idx + 1} {job.title}</span>
                        <strong>{job.count} คน</strong>
                      </div>
                      <div style={{
                        width: "100%",
                        height: 6,
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: 3,
                        overflow: "hidden"
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(job.count / topJobs[0]?.count) * 100}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          style={{
                            height: "100%",
                            background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                            borderRadius: 3
                          }}
                        />
                      </div>
                    </div>
                  )) : (
                    <p style={{ color: "#a0aec0", textAlign: "center" }}>ไม่มีข้อมูล</p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Monthly Statistics Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                background: "rgba(15, 20, 51, 0.6)",
                backdropFilter: "blur(20px)",
                borderRadius: 20,
                border: "1px solid rgba(59, 130, 246, 0.2)",
                padding: 24,
                marginBottom: 30,
                overflowX: "auto"
              }}
            >
              <h3 style={{ fontSize: 18, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <FiBarChart2 /> สถิติรายเดือน
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                <thead>
                  <tr>
                    <th style={styles.th}>เดือน</th>
                    <th style={styles.th}>ผู้ใช้ใหม่</th>
                    <th style={styles.th}>งานใหม่</th>
                    <th style={styles.th}>ใบสมัคร</th>
                    <th style={styles.th}>อัตราการเติบโต</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((data, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      style={{ borderBottom: "1px solid rgba(59,130,246,0.1)" }}
                    >
                      <td style={styles.td}><strong>{data.month}</strong></td>
                      <td style={styles.td}>{data.users}</td>
                      <td style={styles.td}>{data.jobs}</td>
                      <td style={styles.td}>{data.applications}</td>
                      <td style={styles.td}>
                        <span style={{ color: data.users > 50 ? "#10b981" : "#f59e0b" }}>
                          {data.users > 50 ? "↑" : "→"} {((data.users / 100) * 100).toFixed(0)}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Quick Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))",
                borderRadius: 20,
                border: "1px solid rgba(59, 130, 246, 0.3)",
                padding: 24
              }}
            >
              <h3 style={{ fontSize: 18, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <FiTrendingUp /> ข้อมูลเชิงลึก
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 5 }}>อัตราการแปลงผู้สมัคร</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#10b981" }}>68%</div>
                  <div style={{ fontSize: 12, color: "#a0aec0" }}>↑ +5% จากเดือนที่แล้ว</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 5 }}>เวลาตอบสนองเฉลี่ย</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#3b82f6" }}>2.4 ชม.</div>
                  <div style={{ fontSize: 12, color: "#a0aec0" }}>↓ -0.5 ชม. จากเดือนที่แล้ว</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 5 }}>ความพึงพอใจของผู้ใช้</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#f59e0b" }}>4.8/5</div>
                  <div style={{ fontSize: 12, color: "#a0aec0" }}>จากการรีวิว 234 รายการ</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  select: {
    padding: "10px 16px",
    borderRadius: 12,
    background: "rgba(15, 20, 51, 0.6)",
    border: "1px solid rgba(59,130,246,0.3)",
    color: "white",
    cursor: "pointer",
    fontSize: 14
  },
  th: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid rgba(59,130,246,0.2)",
    color: "#a0aec0",
    fontWeight: 600,
    fontSize: 13
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid rgba(59,130,246,0.1)",
    fontSize: 14
  }
};