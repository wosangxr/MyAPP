import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiLock, FiBriefcase, FiCalendar } from "react-icons/fi";
import { auth, API_URL } from "../firebase";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { useTheme } from "../theme";

export default function Profile() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    position: "System Administrator",
    department: "IT Management",
    location: "Bangkok, Thailand",
    bio: "",
    joinDate: new Date().toLocaleDateString()
  });

  useEffect(() => {
    fetchUserProfile();
  }, [navigate]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return navigate("/");
      const token = await user.getIdToken();

      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const { user: data } = await response.json();
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          position: data.profile?.title || "System Administrator",
          department: "IT Management",
          location: data.profile?.location || "Bangkok, Thailand",
          bio: data.profile?.bio || "Experienced administrator with expertise in job board management",
          joinDate: new Date(data.createdAt).toLocaleDateString()
        });
      }
    } catch (err) {
      console.error("Fetch profile error:", err);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ 
          name: profile.name, 
          phone: profile.phone 
        })
      });

      if (response.ok) {
        setIsEditing(false);
        // Refresh local storage if needed
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...stored, name: profile.name }));
      }
    } catch (err) {
      console.error("Save profile error:", err);
    }
  };

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
            style={{ maxWidth: 1000, margin: "0 auto" }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
              <div>
                <h1 className="text-gradient" style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>My Profile</h1>
                <p style={{ color: "#a0aec0", fontSize: 14 }}>Manage your personal information</p>
              </div>
              <button onClick={() => setIsEditing(!isEditing)} className={isEditing ? "btn-danger" : "btn-primary"}>
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {/* Profile Card */}
            <div className="glass-card" style={{ padding: 32, marginBottom: 30 }}>
              <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
                {/* Avatar */}
                <div style={{ textAlign: "center", minWidth: 200 }}>
                  <div className="glow" style={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px"
                  }}>
                    <FiUser size={70} color="white" />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 600 }}>{profile.name}</h3>
                  <p style={{ fontSize: 14, color: "#3b82f6", marginTop: 5 }}>{profile.position}</p>
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                    <div>
                      <label style={styles.label}><FiUser size={14} /> Name</label>
                      {isEditing ? (
                        <input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} style={styles.input} />
                      ) : (
                        <div style={styles.infoBox}>{profile.name}</div>
                      )}
                    </div>
                    <div>
                      <label style={styles.label}><FiMail size={14} /> Email</label>
                      <div style={styles.infoBox}>{profile.email}</div>
                    </div>
                    <div>
                      <label style={styles.label}><FiPhone size={14} /> Phone</label>
                      {isEditing ? (
                        <input value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} style={styles.input} />
                      ) : (
                        <div style={styles.infoBox}>{profile.phone || "-"}</div>
                      )}
                    </div>
                    <div>
                      <label style={styles.label}><FiBriefcase size={14} /> Department</label>
                      <div style={styles.infoBox}>{profile.department}</div>
                    </div>
                    <div>
                      <label style={styles.label}><FiMapPin size={14} /> Location</label>
                      <div style={styles.infoBox}>{profile.location}</div>
                    </div>
                    <div>
                      <label style={styles.label}><FiCalendar size={14} /> Joined</label>
                      <div style={styles.infoBox}>{profile.joinDate}</div>
                    </div>
                  </div>

                  {isEditing && (
                    <button onClick={handleSave} className="btn-primary" style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8 }}>
                      <FiSave /> Save Changes
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="glass-card" style={{ padding: 32 }}>
              <h3 style={{ fontSize: 20, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <FiLock /> Change Password
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 15 }}>
                <input type="password" placeholder="Current Password" style={styles.input} />
                <input type="password" placeholder="New Password" style={styles.input} />
                <input type="password" placeholder="Confirm Password" style={styles.input} />
              </div>
              <button className="btn-primary" style={{ marginTop: 20 }}>Update Password</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  label: {
    display: "block",
    fontSize: 12,
    color: "#a0aec0",
    marginBottom: 6,
    fontWeight: 500
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(59,130,246,0.3)",
    color: "white",
    fontSize: 14,
    outline: "none"
  },
  infoBox: {
    padding: "12px 16px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: 10,
    border: "1px solid rgba(59,130,246,0.1)",
    color: "#e2e8f0",
    fontSize: 14
  }
};