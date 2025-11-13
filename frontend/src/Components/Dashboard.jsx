// import { useEffect, useState } from "react";
// import { Routes, Route, useNavigate, useLocation ,} from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Home1 from "./Home1";
// import MyProfile from "./MyProfile";
// import QuickScan from "./QuickScan";
// import ScanHistory from "./ScanHistory";
// import Reports from "./Reports";
// import AIAssistant from "./AIAssistant";
// import Learn from "./Learn";
// import Subscription from "./Subscription";
// import "./dashboard.css";
// import heroBg from "../assets/Gemini_Generated_Image_wwxt2mwwxt2mwwxt.png";
// import API from "../api/api.js";

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ Detect screen size
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // ✅ Fetch user data on mount
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/");
//         return;
//       }

//       try {
//         const res = await API.get("/dashboard/user", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const userData = res.data.user;
//         setUser(userData);

//         // ✅ Only redirect once when on /dashboard
//         if (
//           location.pathname === "/dashboard" ||
//           location.pathname === "/dashboard/"
//         ) {
//           if (!userData.age || !userData.allergens?.length) {
//             navigate("/dashboard/home");
//           } else {
//             navigate("/dashboard/my-profile");
//           }
//         }
//       } catch (err) {
//         console.error("❌ Dashboard fetch failed:", err);
//         localStorage.removeItem("token");
//         navigate("/dashboard");
//       }
//     };

//     fetchDashboard();
//   }, [navigate, location.pathname]);

//   // ✅ Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   // ✅ Sidebar toggle
//   const toggleSidebar = (forceValue = null) => {
//     setIsOpen(forceValue !== null ? forceValue : !isOpen);
//   };

//   return (
//     <div
//       className="dashboard-container"
//       style={{
//         backgroundImage: `url(${heroBg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         minHeight: "100vh",
//       }}
//     >
//       {/* Sidebar */}
//       <Sidebar
//         isOpen={isOpen}
//         setActivePage={(page) => {
//           navigate(`/dashboard/${page.toLowerCase().replace(/\s+/g, "-")}`);
//           if (isMobile) toggleSidebar(false);
//         }}
//         handleLogout={handleLogout}
//         toggleSidebar={toggleSidebar}
//       />

//       {/* Overlay for mobile */}
//       {isMobile && isOpen && (
//         <div
//           className="sidebar-overlay active"
//           onClick={() => toggleSidebar(false)}
//         ></div>
//       )}

//       {/* Main Content */}
//       <main
//         className={`main-content ${!isMobile && isOpen ? "sidebar-shift" : ""}`}
//       >
//         {user ? (
//           <Routes>
//             <Route path="home" element={<Home1 user={user} />} />
//             <Route path="my-profile" element={<MyProfile user={user} />} />
//             <Route path="quick-scan" element={<QuickScan />} />
//             <Route path="scan-history" element={<ScanHistory />} />
//             <Route path="reports" element={<Reports />} />
//             <Route path="assistant" element={<AIAssistant />} />
//             <Route path="learn" element={<Learn />} />
//             <Route path="subscription" element={<Subscription />} />
//             {/* Default fallback */}
//             <Route path="*" element={<Home1 user={user} />} />
//           </Routes>
//         ) : (
//           <p className="loading-text">Loading...</p>
//         )}
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home1 from "./Home1";
import MyProfile from "./MyProfile";
import QuickScan from "./QuickScan";
import ScanHistory from "./ScanHistory";
import Reports from "./Reports";
import AIAssistant from "./AIAssistant";
import Learn from "./Learn";
import Subscription from "./Subscription";
import "./dashboard.css";
import heroBg from "../assets/Gemini_Generated_Image_wwxt2mwwxt2mwwxt.png";
import API from "../api/api.js";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fetch user data once
  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await API.get("/dashboard/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("❌ Dashboard fetch failed:", err);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchDashboard();
  }, [navigate]);

  // ✅ Redirect logic (only after user is loaded)
  useEffect(() => {
    if (!user) return; // Wait for user data

    if (
      location.pathname === "/dashboard" ||
      location.pathname === "/dashboard/"
    ) {
      if (!user.age || !user.allergens?.length) {
        navigate("/dashboard/home", { replace: true });
      } else {
        navigate("/dashboard/my-profile", { replace: true });
      }
    }
  }, [user, location.pathname, navigate]);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Sidebar toggle
  const toggleSidebar = (forceValue = null) => {
    setIsOpen(forceValue !== null ? forceValue : !isOpen);
  };

  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        setActivePage={(page) => {
          navigate(`/dashboard/${page.toLowerCase().replace(/\s+/g, "-")}`);
          if (isMobile) toggleSidebar(false);
        }}
        handleLogout={handleLogout}
        toggleSidebar={toggleSidebar}
      />

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="sidebar-overlay active"
          onClick={() => toggleSidebar(false)}
        ></div>
      )}

      {/* Main Content */}
      <main
        className={`main-content ${!isMobile && isOpen ? "sidebar-shift" : ""}`}
      >
        {user ? (
          <Routes>
            <Route path="home" element={<Home1 user={user} />} />
            <Route path="my-profile" element={<MyProfile user={user} />} />
            <Route path="quick-scan" element={<QuickScan />} />
            <Route path="scan-history" element={<ScanHistory />} />
            <Route path="reports" element={<Reports />} />
            <Route path="assistant" element={<AIAssistant />} />
            <Route path="learn" element={<Learn />} />
            <Route path="subscription" element={<Subscription />} />
            {/* Default fallback */}
            <Route path="*" element={<Home1 user={user} />} />
          </Routes>
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
