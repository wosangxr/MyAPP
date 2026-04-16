import { useEffect, useState } from "react";
import { auth, API_URL } from "../firebase";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Companies({ toggleTheme }) {
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", location: "", website: "" });

  const fetchCompanies = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();
      
      const response = await fetch(`${API_URL}/stats/admin/companies`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCompanies(data || []);
      }
    } catch (err) {
      console.error("Fetch companies error:", err);
    }
  };

  useEffect(() => { 
    fetchCompanies(); 
  }, []);

  const deleteCompany = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const token = await user.getIdToken();

        const response = await fetch(`${API_URL}/stats/admin/companies/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) fetchCompanies();
      } catch (err) {
        console.error("Delete company error:", err);
      }
    }
  };

  const createCompany = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();

      const response = await fetch(`${API_URL}/stats/admin/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setShowForm(false);
        setFormData({ name: "", location: "", website: "" });
        fetchCompanies();
      }
    } catch (err) {
      console.error("Create company error:", err);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar toggleTheme={toggleTheme} />
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Companies Management</h2>
            <button onClick={() => setShowForm(!showForm)} style={styles.addButton}>+ Add Company</button>
          </div>

          {showForm && (
            <div style={styles.form}>
              <input placeholder="Company Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={styles.input} />
              <input placeholder="Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={styles.input} />
              <input placeholder="Website" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} style={styles.input} />
              <button onClick={createCompany} style={styles.saveButton}>Save</button>
            </div>
          )}

          <div style={styles.grid}>
            {companies.map(company => (
              <div key={company.id} style={styles.card}>
                <h3>{company.name}</h3>
                <p>📍 {company.location}</p>
                <p>🌐 {company.website}</p>
                <button onClick={() => deleteCompany(company.id)} style={styles.deleteButton}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  addButton: { padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", borderRadius: 5, cursor: "pointer" },
  form: { background: "#f4f4f4", padding: 20, borderRadius: 10, marginBottom: 20 },
  input: { display: "block", width: "100%", marginBottom: 10, padding: 10, borderRadius: 5, border: "1px solid #ddd" },
  saveButton: { padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", borderRadius: 5, cursor: "pointer" },
  deleteButton: { padding: "5px 10px", background: "#f44336", color: "white", border: "none", borderRadius: 3, cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, marginTop: 20 },
  card: { background: "#f9f9f9", padding: 20, borderRadius: 10, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }
};