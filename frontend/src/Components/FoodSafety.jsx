import React from "react";
import { useNavigate } from "react-router-dom";
import "./PrivacyPolicy.css"; 

const FoodSafety = () => {
  const navigate = useNavigate();

  return (
     <div className="static-page-wrapper">
      <div className="static-page-container">
        <h1>Food Safety</h1>
        <p>
          Food safety ensures that food is handled, stored, and prepared in ways that prevent contamination. Safe handling reduces the risk of foodborne illnesses and allergic reactions.
        </p>
        <p>Important steps include:</p>
        <ul>
          <li><strong>Clean:</strong> Wash hands, utensils, and surfaces thoroughly.</li>
          <li><strong>Separate:</strong> Avoid cross-contamination between raw and cooked foods.</li>
          <li><strong>Cook:</strong> Cook foods to safe internal temperatures.</li>
          <li><strong>Chill:</strong> Refrigerate perishable foods promptly.</li>
        </ul>
        <p>
          Following these practices helps protect your health and ensures safe consumption of all foods.
        </p>

        <div className="policy-back-btn-container">
          <button className="policy-back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodSafety;
