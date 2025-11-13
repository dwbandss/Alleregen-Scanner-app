import React from "react";
import { useNavigate } from "react-router-dom";
import "./PrivacyPolicy.css"; 

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
     <div className="static-page-wrapper">
      <div className="static-page-container">
        <h1>Privacy Policy</h1>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>User profiles including allergy and dietary preferences</li>
          <li>Scan history for food products</li>
          <li>App settings and personalization data</li>
          <li>Usage analytics to improve app performance</li>
        </ul>

        <h2>2. How We Use Your Data</h2>
        <p>
          Your data is used to provide a personalized and accurate experience:
        </p>
        <ul>
          <li>Analyzing scanned food items against your allergy profile</li>
          <li>Providing notifications and alerts about potential allergens</li>
          <li>Improving app functionality and performance</li>
          <li>Understanding usage patterns to enhance user experience</li>
        </ul>

        <h2>3. Data Security</h2>
        <p>
          We implement strict security measures to protect your information. All sensitive data is encrypted in transit and at rest.
        </p>
        <p>
          Only authorized personnel have access to your data, and we conduct regular audits to ensure its safety.
        </p>

        <h2>4. Sharing and Disclosure</h2>
        <p>
          We do not sell or share your personal information with third parties. Data is only used internally for app functionality and analytics.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You can review, edit, or delete your data at any time via your account settings. If you have any questions regarding your data, contact us directly.
        </p>
        <button className="static-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;