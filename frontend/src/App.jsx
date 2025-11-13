import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import FAQSection from "./Components/FAQsection"; // ✅ import FAQSection
import TermsOfUse from "./Components/TermsOfUse";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import AboutAllergens from "./Components/AboutAllergens"; // ✅ New
import FoodSafety from "./Components/FoodSafety"; 
import { Toaster } from "react-hot-toast";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ✅ Sync token when localStorage changes (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Sync token reactively when localStorage updates in this tab
  useEffect(() => {
    const checkToken = () => {
      const newToken = localStorage.getItem("token");
      if (newToken !== token) {
        setToken(newToken);
      }
    };
    const interval = setInterval(checkToken, 500); // recheck every 0.5s
    return () => clearInterval(interval);
  }, [token]);

  // ✅ Logout handler to pass into Dashboard
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // ✅ Private Route wrapper
  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: "#333", color: "#fff", borderRadius: "8px" },
        }}
      />

      <Routes>
        {/* Public route */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard/home" /> : <Home />}
        />

        {/* FAQ Route (Public) */}
        <Route path="/faq" element={<FAQSection />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
  <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
   <Route path="/about-allergens" element={<AboutAllergens />} />
        <Route path="/food-safety" element={<FoodSafety />} />

        {/* Private Dashboard route */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        {/* Password routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
