import React from "react";
import { useNavigate } from "react-router-dom";
import "./PrivacyPolicy.css"; 

const AboutAllergens = () => {
  const navigate = useNavigate();

  return (
   <div className="static-page-wrapper">
      <div className="static-page-container">
        <h1>About Allergens</h1>
        <p>
          Allergens are substances that can trigger an allergic reaction in sensitive individuals. Understanding them helps you make safer food choices and avoid reactions.
        </p>
        <p>
          Common food allergens include:
        </p>
        <ul>
          <li>Peanuts</li>
          <li>Tree nuts</li>
          <li>Milk</li>
          <li>Eggs</li>
          <li>Wheat</li>
          <li>Soy</li>
          <li>Fish</li>
          <li>Shellfish</li>
        </ul>
        <p>
          Tips for managing allergens:
        </p>
        <ul>
          <li>Always check labels before consuming packaged foods.</li>
          <li>Ask about ingredients when eating out.</li>
          <li>Maintain a personal allergen list and update it regularly.</li>
        </ul>

        <div className="policy-back-btn-container">
          <button className="policy-back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutAllergens;
