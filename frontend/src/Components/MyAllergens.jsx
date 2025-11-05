import React from "react";
import "./myprofile.css";

function MyProfile({ user }) {
  return (
    <div className="dashboard-page">
      <div className="profile-container">
        <div className="profile-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile Avatar"
            className="profile-avatar"
          />
          <div className="profile-info">
            <h2>{user?.name || "User Name"}</h2>
            <p>{user?.email || "user@email.com"}</p>
            <div className="badges">
              <span className="badge premium">⭐ Premium Member</span>
              <span className="badge verified">✔ Verified Account</span>
            </div>
          </div>
          <button className="edit-btn">✏️ Edit Profile</button>
        </div>

        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div>
              <p><strong>Full Name</strong></p>
              <p>{user?.name || "Not Available"}</p>
            </div>
            <div>
              <p><strong>Date of Birth</strong></p>
              <p>March 15, 1990</p>
            </div>
            <div>
              <p><strong>Phone Number</strong></p>
              <p>+1 (555) 123-4567</p>
            </div>
            <div>
              <p><strong>Location</strong></p>
              <p>San Francisco, CA</p>
            </div>
          </div>
        </div>

        <div className="bottom-grid">
          <div className="small-card">
            <h4>Linked Devices</h4>
            <p>2 Devices Connected</p>
          </div>
          <div className="small-card">
            <h4>Subscription Status</h4>
            <p>Active until Dec 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;