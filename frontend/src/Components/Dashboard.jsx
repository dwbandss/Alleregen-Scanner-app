import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Home1 from "./Home1";
import MyProfile from "./MyProfile";
import QuickScan from "./QuickScan";
import ScanHistory from "./ScanHistory";
import Reports from "./Reports";
import AIAssistant from "./AIAssistant";
import Learn from "./Learn";
import { FaBars } from "react-icons/fa";
import "./dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(true); // Sidebar open by default
  const [activePage, setActivePage] = useState("Home");

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login again.");
        window.location.href = "/signup";
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Unauthorized");
        localStorage.removeItem("token");
        window.location.href = "/signup";
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
  
  };

  const renderContent = () => {
    switch (activePage) {
      case "Home":
        return <Home1 user={user} />;
      case "My Profile":
        return <MyProfile user={user} />;
      case "Quick Scan":
        return <QuickScan />;
      case "Scan History":
        return <ScanHistory />;
      case "Reports":
        return <Reports />;
      case "AI Assistant":
        return <AIAssistant />;
      case "Learn":
        return <Learn />;
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        setActivePage={setActivePage}
        handleLogout={handleLogout}
        toggleSidebar={() => setIsOpen(!isOpen)}
      />

      {/* Overlay (appears when sidebar is open) */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`menu-btn ${isOpen ? "open" : "closed"}`}
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>

      {/* Main Content */}
      <main className={`main-content ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        {user ? renderContent() : <p className="loading-text">Loading...</p>}
      </main>
    </div>
  );
}

export default Dashboard;
