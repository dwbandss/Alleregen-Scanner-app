import React from "react";
import "./MyProfile.css";
import { FaEdit, FaCheckCircle, FaCrown } from "react-icons/fa";

function MyProfile({ user }) {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-left">               
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="profile-img"
          />
          <div className="profile-info">
            <h2>{user?.name || "Sarah Johnson"}</h2>
            <p className="email">{user?.email || "sarah.johnson@email.com"}</p>
            <div className="badges">
              <span className="badge premium">
                <FaCrown /> Premium Member
              </span>
              <span className="badge verified">
                <FaCheckCircle /> Verified Account
              </span>
            </div>
          </div>
        </div>
        <button className="edit-btn">
          <FaEdit /> Edit Profile
        </button>
      </div>

      <div className="profile-sections">
        <div className="info-card">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div>
              <p className="label">Full Name</p>
              <p>{user?.name || "Sarah Johnson"}</p>
            </div>
            <div>
              <p className="label">Date of Birth</p>
              <p>March 15, 1990</p>
            </div>
            <div>
              <p className="label">Phone Number</p>
              <p>+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="label">Location</p>
              <p>San Francisco, CA</p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default MyProfile;
