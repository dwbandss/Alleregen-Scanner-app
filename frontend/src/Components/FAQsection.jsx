import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FAQsection.css";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "What is AllergenScanner?",
      answer:
        "AllergenScanner is an AI-powered app that scans food labels, menus, and ingredients to identify potential allergens and check compatibility with your dietary profile.",
    },
    {
      question: "How does the allergy detection work?",
      answer:
        "The app uses advanced text recognition and machine learning to detect ingredients from scanned images, comparing them with your stored allergen preferences.",
    },
    {
      question: "Is my personal data safe?",
      answer:
        "Absolutely! We encrypt your data using industry-standard protocols and never share your information without consent.",
    },
    {
      question: "Can I use the app offline?",
      answer:
        "Yes, basic features such as viewing your allergen list are available offline. However, scanning and analysis require an internet connection for AI processing.",
    },
  ];

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Get quick answers about allergens, food safety, and our features.</p>
      </div>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-icon">▼</span>
            </div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}

        {/* ✅ Back Button */}
        <div className="faq-back-btn-container">
          <button className="faq-back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;