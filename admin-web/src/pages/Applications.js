import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiFileText, FiCheckCircle, FiClock, FiXCircle, 
  FiSearch, FiEye, FiTrash2, FiDownload,
  FiUser, FiBriefcase, FiCalendar, FiMessageSquare, FiMail
} from "react-icons/fi";
import { auth, API_URL } from "../firebase";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { useTheme } from "../theme";

export default function Applications() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // ใช้ useCallback เพื่อ memoize function
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();

      const response = await fetch(`${API_URL}/stats/admin/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        // 🛠️ Filter status on frontend if needed, or backend can be updated
        const filtered = statusFilter === "all" 
          ? data 
          : data.filter(a => a.status === statusFilter);
        setApplications(filtered || []);
      }
    } catch (err) {
      console.error("Fetch applications error:", err);
    }
    setLoading(false);
  }, [statusFilter]); // เพิ่ม dependency statusFilter

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]); // ใส่ fetchApplications ใน dependency

  const updateStatus = async (id, newStatus) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();

      const response = await fetch(`${API_URL}/stats/admin/applications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus, reviewed_at: new Date() })
      });
      
      if (response.ok) {
        setApplications(applications.map(app => 
          app._id === id ? { ...app, status: newStatus } : app
        ));
      }
    } catch (err) {
      console.error("Update application status error:", err);
    }
  };

  const deleteApplication = async (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ที่จะลบใบสมัครนี้?")) {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const token = await user.getIdToken();

        const response = await fetch(`${API_URL}/stats/admin/applications/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) fetchApplications();
      } catch (err) {
        console.error("Delete application error:", err);
      }
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: { 
        label: "รอพิจารณา", 
        color: "#f59e0b", 
        bg: "rgba(245, 158, 11, 0.15)",
        icon: FiClock,
        border: "1px solid rgba(245, 158, 11, 0.3)"
      },
      approved: { 
        label: "อนุมัติแล้ว", 
        color: "#10b981", 
        bg: "rgba(16, 185, 129, 0.15)",
        icon: FiCheckCircle,
        border: "1px solid rgba(16, 185, 129, 0.3)"
      },
      rejected: { 
        label: "ปฏิเสธ", 
        color: "#ef4444", 
        bg: "rgba(239, 68, 68, 0.15)",
        icon: FiXCircle,
        border: "1px solid rgba(239, 68, 68, 0.3)"
      }
    };
    return configs[status] || configs.pending;
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    approved: applications.filter(a => a.status === "approved").length,
    rejected: applications.filter(a => a.status === "rejected").length
  };

  const filteredApplications = applications.filter(app =>
    app.users?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.users?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobs?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;

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
            <div style={{ marginBottom: 30 }}>
              <h1 className="text-gradient" style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
                จัดการใบสมัครงาน
              </h1>
              <p style={{ color: "#a0aec0", fontSize: 14 }}>
                จัดการและติดตามสถานะการสมัครงานทั้งหมด
              </p>
            </div>

            {/* Stats Cards */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: 16, 
              marginBottom: 24 
            }}>
              {[
                { label: "ทั้งหมด", value: stats.total, icon: FiFileText, color: "#3b82f6" },
                { label: "รอพิจารณา", value: stats.pending, icon: FiClock, color: "#f59e0b" },
                { label: "อนุมัติแล้ว", value: stats.approved, icon: FiCheckCircle, color: "#10b981" },
                { label: "ปฏิเสธ", value: stats.rejected, icon: FiXCircle, color: "#ef4444" }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -3 }}
                    className="glass-card"
                    style={{ padding: 20, textAlign: "center", cursor: "pointer" }}
                    onClick={() => setStatusFilter(idx === 0 ? "all" : stat.label === "รอพิจารณา" ? "pending" : stat.label === "อนุมัติแล้ว" ? "approved" : "rejected")}
                  >
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: `${stat.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px"
                    }}>
                      <Icon size={24} color={stat.color} />
                    </div>
                    <h3 style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</h3>
                    <p style={{ fontSize: 13, color: "#a0aec0", marginTop: 4 }}>{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Filter and Search Bar */}
            <div className="glass-card" style={{ padding: 20, marginBottom: 24 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
                {/* Filter Buttons */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[
                    { id: "all", label: "ทั้งหมด", icon: FiFileText },
                    { id: "pending", label: "รอพิจารณา", icon: FiClock, color: "#f59e0b" },
                    { id: "approved", label: "อนุมัติแล้ว", icon: FiCheckCircle, color: "#10b981" },
                    { id: "rejected", label: "ปฏิเสธ", icon: FiXCircle, color: "#ef4444" }
                  ].map((filter) => {
                    const Icon = filter.icon;
                    const isActive = statusFilter === filter.id;
                    return (
                      <motion.button
                        key={filter.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStatusFilter(filter.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "8px 20px",
                          borderRadius: 30,
                          background: isActive ? `linear-gradient(135deg, ${filter.color || "#3b82f6"}, ${filter.color || "#1d4ed8"})` : "rgba(255,255,255,0.05)",
                          border: isActive ? "none" : "1px solid rgba(59,130,246,0.3)",
                          color: isActive ? "white" : "#a0aec0",
                          cursor: "pointer",
                          fontSize: 14,
                          fontWeight: 500
                        }}
                      >
                        <Icon size={16} />
                        {filter.label}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Search Box */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.05)", padding: "8px 16px", borderRadius: 30, border: "1px solid rgba(59,130,246,0.3)" }}>
                  <FiSearch color="#a0aec0" size={18} />
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อผู้สมัคร หรือตำแหน่งงาน..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#fff",
                      fontSize: 14,
                      minWidth: 250
                    }}
                  />
                </div>

                {/* Export Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 20px",
                    borderRadius: 30,
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 500
                  }}
                >
                  <FiDownload size={16} />
                  ส่งออกรายงาน
                </motion.button>
              </div>
            </div>

            {/* Applications List */}
            <div className="glass-card" style={{ padding: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {filteredApplications.length === 0 ? (
                  <div style={{ textAlign: "center", padding: 60, color: "#a0aec0" }}>
                    <FiFileText size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
                    <p>ไม่พบข้อมูลการสมัครงาน</p>
                  </div>
                ) : (
                  filteredApplications.map((app, idx) => {
                    const statusConfig = getStatusConfig(app.status);
                    const StatusIcon = statusConfig.icon;
                    
                    return (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                        style={{
                          padding: 20,
                          borderRadius: 16,
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(59,130,246,0.1)",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                          {/* Left Section - Applicant Info */}
                          <div style={{ flex: 2 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                              <div style={{
                                width: 50,
                                height: 50,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 18,
                                fontWeight: 600
                              }}>
                                {app.users?.name?.[0]?.toUpperCase()}
                              </div>
                              <div>
                                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                                  {app.users?.name}
                                </h3>
                                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                                  <span style={{ fontSize: 13, color: "#a0aec0", display: "flex", alignItems: "center", gap: 4 }}>
                                    <FiMail size={12} /> {app.users?.email}
                                  </span>
                                  {app.users?.phone && (
                                    <span style={{ fontSize: 13, color: "#a0aec0", display: "flex", alignItems: "center", gap: 4 }}>
                                      <FiUser size={12} /> {app.users?.phone}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Job Info */}
                            <div style={{ 
                              background: "rgba(59,130,246,0.1)", 
                              borderRadius: 12, 
                              padding: 12,
                              marginTop: 12
                            }}>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
                                  <FiBriefcase size={14} color="#3b82f6" />
                                  <strong>{app.jobs?.title}</strong>
                                </span>
                                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#a0aec0" }}>
                                  <FiCalendar size={12} />
                                  สมัครเมื่อ: {new Date(app.created_at).toLocaleDateString("th-TH")}
                                </span>
                              </div>
                              {app.jobs?.location && (
                                <div style={{ fontSize: 13, color: "#a0aec0", marginTop: 8 }}>
                                  📍 {app.jobs.location}
                                </div>
                              )}
                              {app.jobs?.salary_min && app.jobs?.salary_max && (
                                <div style={{ fontSize: 13, color: "#10b981", marginTop: 4 }}>
                                  💰 {app.jobs.salary_min.toLocaleString()} - {app.jobs.salary_max.toLocaleString()} บาท
                                </div>
                              )}
                            </div>

                            {app.cover_letter && (
                              <div style={{ marginTop: 12 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                                  <FiMessageSquare size={12} color="#a0aec0" />
                                  <span style={{ fontSize: 12, color: "#a0aec0" }}>จดหมายสมัครงาน:</span>
                                </div>
                                <p style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.5 }}>
                                  {app.cover_letter.length > 150 ? `${app.cover_letter.substring(0, 150)}...` : app.cover_letter}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Right Section - Status & Actions */}
                          <div style={{ textAlign: "right", minWidth: 140 }}>
                            {/* Status Badge */}
                            <div style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "6px 14px",
                              borderRadius: 30,
                              background: statusConfig.bg,
                              border: statusConfig.border,
                              marginBottom: 16
                            }}>
                              <StatusIcon size={14} color={statusConfig.color} />
                              <span style={{ fontSize: 13, fontWeight: 500, color: statusConfig.color }}>
                                {statusConfig.label}
                              </span>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                              {app.status === "pending" && (
                                <>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => updateStatus(app.id, "approved")}
                                    style={{
                                      padding: "8px 16px",
                                      borderRadius: 8,
                                      background: "rgba(16,185,129,0.15)",
                                      border: "1px solid rgba(16,185,129,0.3)",
                                      color: "#10b981",
                                      cursor: "pointer",
                                      fontSize: 12,
                                      fontWeight: 500,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6
                                    }}
                                  >
                                    <FiCheckCircle size={14} />
                                    อนุมัติ
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => updateStatus(app.id, "rejected")}
                                    style={{
                                      padding: "8px 16px",
                                      borderRadius: 8,
                                      background: "rgba(239,68,68,0.15)",
                                      border: "1px solid rgba(239,68,68,0.3)",
                                      color: "#ef4444",
                                      cursor: "pointer",
                                      fontSize: 12,
                                      fontWeight: 500,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6
                                    }}
                                  >
                                    <FiXCircle size={14} />
                                    ปฏิเสธ
                                  </motion.button>
                                </>
                              )}
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  setSelectedApp(app);
                                  setShowDetailModal(true);
                                }}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: 8,
                                  background: "rgba(59,130,246,0.15)",
                                  border: "1px solid rgba(59,130,246,0.3)",
                                  color: "#3b82f6",
                                  cursor: "pointer"
                                }}
                              >
                                <FiEye size={16} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => deleteApplication(app.id)}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: 8,
                                  background: "rgba(239,68,68,0.15)",
                                  border: "1px solid rgba(239,68,68,0.3)",
                                  color: "#ef4444",
                                  cursor: "pointer"
                                }}
                              >
                                <FiTrash2 size={16} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedApp && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetailModal(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
                zIndex: 998
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
                width: "90%",
                maxWidth: 600,
                maxHeight: "80vh",
                overflow: "auto",
                background: "rgba(15, 20, 51, 0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: 24,
                border: "1px solid rgba(59,130,246,0.3)",
                padding: 32,
                zIndex: 999
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700 }}>รายละเอียดใบสมัคร</h2>
                <button onClick={() => setShowDetailModal(false)} style={{ background: "none", border: "none", color: "#a0aec0", cursor: "pointer", fontSize: 24 }}>✕</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 4 }}>ชื่อผู้สมัคร</div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{selectedApp.users?.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 4 }}>อีเมล</div>
                  <div style={{ fontSize: 14 }}>{selectedApp.users?.email}</div>
                </div>
                {selectedApp.users?.phone && (
                  <div>
                    <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 4 }}>เบอร์โทรศัพท์</div>
                    <div style={{ fontSize: 14 }}>{selectedApp.users?.phone}</div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 4 }}>ตำแหน่งงาน</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#3b82f6" }}>{selectedApp.jobs?.title}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 4 }}>วันที่สมัคร</div>
                  <div style={{ fontSize: 14 }}>{new Date(selectedApp.created_at).toLocaleDateString("th-TH")}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 4 }}>สถานะ</div>
                  <div style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: 20,
                    background: getStatusConfig(selectedApp.status).bg,
                    color: getStatusConfig(selectedApp.status).color,
                    fontSize: 13
                  }}>
                    {getStatusConfig(selectedApp.status).label}
                  </div>
                </div>
                {selectedApp.cover_letter && (
                  <div>
                    <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 4 }}>จดหมายสมัครงาน</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, background: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 12 }}>
                      {selectedApp.cover_letter}
                    </div>
                  </div>
                )}
                {selectedApp.notes && (
                  <div>
                    <div style={{ fontSize: 12, color: "#a0aec0", marginBottom: 4 }}>หมายเหตุ</div>
                    <div style={{ fontSize: 14, background: "rgba(245,158,11,0.1)", padding: 12, borderRadius: 8 }}>
                      {selectedApp.notes}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}