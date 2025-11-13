import React from "react";
import { useNavigate } from "react-router-dom";
import "./PrivacyPolicy.css";

const TermsOfUse = () => {
  const navigate = useNavigate();

  return (
  <div className="static-page-wrapper">
      <div className="static-page-container">
        <h1>Terms of Use</h1>

         <p>
          Welcome to <strong>AllergenScanner</strong>. By accessing or using our app, you agree to comply with these terms.
        </p>

        <h2>1. Account Responsibility</h2>
        <p>
          Users are responsible for maintaining the confidentiality of their account credentials and for all activities under their account.
        </p>

        <h2>2. Use of the App</h2>
        <p>
          The app is intended to provide allergen detection and dietary guidance. It should not replace professional medical advice.
        </p>

        <h2>3. Content Accuracy</h2>
        <p>
          While we strive for accuracy, AllergenScanner cannot guarantee complete accuracy of ingredient or allergen information.
        </p>

        <h2>4. Prohibited Activities</h2>
        <ul>
          <li>Misuse of the app for fraudulent purposes</li>
          <li>Unauthorized sharing or distribution of app content</li>
          <li>Attempting to reverse-engineer the app or bypass security features</li>
        </ul>

        <h2>5. Liability</h2>
        <p>
          AllergenScanner is not liable for any direct or indirect damages resulting from the use of the app. Users should verify information independently if necessary.
        </p>

        <h2>6. Updates</h2>
        <p>
          Terms may be updated periodically. Continued use of the app implies acceptance of updated terms.
        </p>
        <button className="static-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
};

export default TermsOfUse;