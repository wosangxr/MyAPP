import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Jobs from "./pages/Jobs";
import Companies from "./pages/Companies";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Finance from "./pages/Finance";
import MasterData from "./pages/MasterData";
import Support from "./pages/Support";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Layout><Users /></Layout></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><Layout><Jobs /></Layout></ProtectedRoute>} />
        <Route path="/finance" element={<ProtectedRoute><Layout><Finance /></Layout></ProtectedRoute>} />
        <Route path="/master-data" element={<ProtectedRoute><Layout><MasterData /></Layout></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><Layout><Support /></Layout></ProtectedRoute>} />
        <Route path="/companies" element={<ProtectedRoute><Layout><Companies /></Layout></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute><Layout><Applications /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;