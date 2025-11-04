import React, { useEffect, useState, useRef } from "react";
import {
  FaHome,
  FaUser,
  FaBolt,
  FaHistory,
  FaFileAlt,
  FaRobot,
  FaBook,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBoxOpen,
} from "react-icons/fa";
import "./sidebar.css";
import logo from "../assets/Final Logo.png";

const Sidebar = ({ isOpen, setActivePage, handleLogout, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sidebarRef = useRef(null); // 👈 reference to sidebar

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 👇 Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleSidebar]);

  const menuItems = [
    { label: "Home", icon: <FaHome />, path: "/dashboard" },
    { label: "My Profile", icon: <FaUser />, path: "/dashboard/myprofile" },
    { label: "Quick Scan", icon: <FaBolt /> },
    { label: "Scan History", icon: <FaHistory /> },
    { label: "Reports", icon: <FaFileAlt /> },
    { label: "AI Assistant", icon: <FaRobot /> },
    { label: "Learn", icon: <FaBook /> },
    { label: "Subscription", icon: <FaBoxOpen /> },
  ];

  const handleMenuClick = (page) => {
    setActivePage(page);
    toggleSidebar(false); // 👈 close sidebar on any menu click
  };

  const handleLogoutClick = () => {
    handleLogout();
    toggleSidebar(false);
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`sidebar-toggle ${isOpen ? "active" : ""}`}
        onClick={() => toggleSidebar(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside ref={sidebarRef} className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo-wrapper">
            <img src={logo} alt="AllerScan Logo" className="sidebar-logo" />
          </div>
          <h2 className="sidebar-title">AllerScan</h2>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="sidebar-item"
              onClick={() => handleMenuClick(item.label)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogoutClick}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="sidebar-overlay active"
          onClick={() => toggleSidebar(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
