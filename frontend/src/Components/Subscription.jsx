import React, { useState } from 'react';
import './Subscription.css';

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);

  // Toggle FAQ open/close
  const toggleFaq = (index) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const freePlanFeatures = [
    { icon: '📷', text: '2 Scans per day' },
    { icon: '🏷️', text: 'Add up to 1 Allergen' },
    { icon: '🧠', text: '5 AI Assistant Conversations / day' },
    { icon: '🔍', text: 'Basic Allergen Detection' },
    { icon: '💬', text: 'Limited Support Access' }
  ];

  const premiumPlanFeatures = [
    { icon: '♾️', text: 'Unlimited Scans per day' },
    { icon: '🏷️', text: 'Add Unlimited Allergens' },
    { icon: '🧠', text: 'Unlimited AI Conversations' },
    { icon: '🚀', text: 'Advanced Detection Engine (AI+ML)' },
    { icon: '☁️', text: 'Priority Cloud Storage' },
    { icon: '⭐', text: 'Early Access to New Features' },
    { icon: '🔔', text: 'Personalized Health Alerts' },
    { icon: '🎯', text: '24×7 Priority Support' }
  ];

  const comparisonData = [
    { feature: 'Daily Scans', free: '2', premium: 'Unlimited' },
    { feature: 'Allergens Tracking', free: '1', premium: 'Unlimited' },
    { feature: 'AI Assistant', free: '5/day', premium: 'Unlimited' },
    { feature: 'Detection Quality', free: 'Basic', premium: 'Advanced AI+ML' },
    { feature: 'Cloud Storage', free: false, premium: true },
    { feature: 'Health Alerts', free: false, premium: true },
    { feature: 'Priority Support', free: false, premium: true },
    { feature: 'New Features Access', free: false, premium: true }
  ];

  const testimonials = [
    { name: 'Riya', age: '26', avatar: '👩‍💼', rating: 5, text: '"ALLERSCAN helped me finally eat stress-free. Life-changing!"' },
    { name: 'Arjun', age: '34', avatar: '👨‍💼', rating: 5, text: '"Worth every rupee for the peace of mind it gives me daily."' },
    { name: 'Priya', age: '29', avatar: '👩‍🔬', rating: 5, text: '"The AI assistant is incredibly smart. Saved me multiple times!"' }
  ];

  const faqs = [
    { question: 'Can I cancel anytime?', answer: 'Yes, you can cancel your subscription at any time. There are no cancellation fees, and you\'ll retain access until the end of your billing period.' },
    { question: 'Do scans reset daily?', answer: 'Yes, your scan quota resets every 24 hours at midnight. Unused scans do not roll over to the next day.' },
    { question: 'Is my data safe?', answer: 'Absolutely. We use bank-level encryption and comply with international data protection standards. Your health data is never shared with third parties.' },
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit/debit cards, UPI, net banking, and popular digital wallets including Google Pay and Paytm.' },
    { question: 'Can I upgrade from Free to Premium later?', answer: 'Yes! You can upgrade to Premium at any time. Your existing scan history and allergen profiles will be preserved.' }
  ];

  return (
    <div className="subscription-page">
      {/* Decorative Background Pills */}
      <div className="decorative-pills">
        <div className="pill pill-blue"></div>
        <div className="pill pill-orange"></div>
        <div className="pill pill-beige"></div>
        <div className="pill pill-green"></div>
        <div className="pill pill-dark"></div>
        <div className="pill pill-light-orange"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Choose Your Plan — Scan Smarter, Live Healthier</h1>
        <p className="hero-subtitle">Find your perfect protection level. Start free or unlock unlimited access.</p>

        {/* Billing Toggle */}
        <div className="billing-toggle">
          <span className={billingCycle === 'monthly' ? 'active' : ''}>Monthly</span>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={billingCycle === 'yearly'}
              onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            />
            <span className="slider"></span>
          </label>
          <span className={billingCycle === 'yearly' ? 'active' : ''}>Yearly</span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-cards">
        {/* Free Plan */}
        <div className="pricing-card">
          <div className="card-header">
            <h2 className="plan-title">Free Plan</h2>
            <p className="plan-description">For casual users who want to stay safe occasionally</p>
          </div>
          <div className="price-container">
            <span className="currency">₹</span>
            <span className="price">0</span>
            <span className="period">/ month</span>
          </div>
          <ul className="features-list">
            {freePlanFeatures.map((feature, index) => (
              <li key={index} className="feature-item">
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-text">{feature.text}</span>
              </li>
            ))}
          </ul>
          <button className="cta-button secondary">Start for Free</button>
        </div>

        {/* Premium Plan */}
        <div className="pricing-card premium">
          <div className="popular-badge">⭐ Most Popular</div>
          <div className="card-header">
            <h2 className="plan-title">Premium Plan</h2>
            <p className="plan-description">For proactive users who want complete peace of mind</p>
          </div>
          <div className="price-container">
            <span className="currency">₹</span>
            <span className="price">{billingCycle === 'monthly' ? '199' : '1,990'}</span>
            <span className="period">/ {billingCycle === 'monthly' ? 'month' : 'year'}</span>
          </div>
          <ul className="features-list">
            {premiumPlanFeatures.map((feature, index) => (
              <li key={index} className="feature-item">
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-text">{feature.text}</span>
              </li>
            ))}
          </ul>
          <button className="cta-button primary">Go Premium ✨</button>
          <div className="trust-badges">
            <span className="trust-item">🛡️ Secure Payment</span>
            <span className="trust-item">⚡ Instant Access</span>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="comparison-section">
        <h2 className="section-title">Detailed Feature Comparison</h2>
        <div className="comparison-table">
          <div className="table-header">
            <div className="table-cell header-cell">Feature</div>
            <div className="table-cell header-cell">Free</div>
            <div className="table-cell header-cell">Premium</div>
          </div>
          {comparisonData.map((row, index) => (
            <div key={index} className="table-row">
              <div className="table-cell feature-cell">{row.feature}</div>
              <div className="table-cell value-cell">
                {typeof row.free === 'boolean' ? (
                  row.free ? <span className="check-icon">✓</span> : <span className="cross-icon">✕</span>
                ) : row.free}
              </div>
              <div className="table-cell value-cell premium-cell">
                {typeof row.premium === 'boolean' ? (
                  row.premium ? <span className="check-icon">✓</span> : <span className="cross-icon">✕</span>
                ) : row.premium}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">{testimonial.avatar}</div>
                <div className="user-info">
                  <h4 className="user-name">{testimonial.name}, {testimonial.age}</h4>
                  <div className="rating">
                    {[...Array(testimonial.rating)].map((_, i) => <span key={i} className="star">⭐</span>)}
                  </div>
                </div>
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openFaq === index ? 'active' : ''}`}>
              <button
                type="button"
                className={`faq-question ${openFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
              </button>
              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="footer">
        <nav className="footer-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#learn">Learn</a>
          <a href="#reports">Reports</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </nav>
        <div className="footer-brand">
          <p className="copyright">© 2025 ALLERSCAN</p>
          <p className="tagline">"Eat Smart. Live Safe."</p>
        </div>
      </footer> */}
    </div>
  );
};

export default Subscription;
