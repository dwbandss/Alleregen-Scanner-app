import React from "react";
import "./home1.css";
import heroBg from "../assets/Gemini_Generated_Image_wwxt2mwwxt2mwwxt.png";

export default function Home1({ user }) {
  const bgStyle = { ["--home-bg"]: `url(${heroBg})` };

  return (
    <div className="dashboard-wrapper" style={bgStyle}>
      <header className="dashboard-header">
        <h1>
          Welcome, <span>{user?.name || user?.username || "User"}</span> 👋
        </h1>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-card">
          <h2>Recent Scan History</h2>
          <p>Your latest allergen scans</p>
          <table>
            <thead>
              <tr>
                <th>Food Item</th>
                <th>Allergens</th>
                <th>Safety Status</th>
                <th>Date &amp; Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Almond Milk</td>
                <td>Tree Nuts</td>
                <td className="unsafe">Unsafe (45%)</td>
                <td>Oct 31, 2025 10:23 AM</td>
              </tr>
              <tr>
                <td>Gluten-Free Bread</td>
                <td>None</td>
                <td className="safe">Safe (98%)</td>
                <td>Oct 31, 2025 09:15 AM</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="dashboard-row">
          <div className="dashboard-card small">
            <h3>Weekly Scan Activity</h3>
            <p>Scans performed this week: 807</p>
          </div>

          <div className="dashboard-card small">
            <h3>Allergen Distribution</h3>
            <p>Types of allergens detected</p>
          </div>
        </div>
      </section>
    </div>
  );
}
