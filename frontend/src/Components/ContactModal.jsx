import React, { useState } from "react";
import "./ContactModal.css";
import API from "../api/api";

const ContactModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    // debug: log changes
    // console.log("input change", e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("");
    try {
      const res = await API.post("/contact/send", formData);
      if (res.status === 200) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => closeModal(), 1200);
      } else setStatus("❌ Failed to send message.");
    } catch (err) {
      console.error("Contact send error:", err);
      setStatus("❌ Something went wrong. Try again.");
    } finally {
      setSending(false);
    }
  };

  // debug helper: check top element at center of modal
  const debugTopAtCenter = () => {
    try {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      // eslint-disable-next-line no-undef
      const el = document.elementFromPoint(cx, cy);
      console.log("elementFromPoint center:", el && (el.tagName + " " + (el.className || el.id)));
    } catch (e) { console.warn(e); }
  };

  return (
    <div
      className="contact-modal-overlay"
      onClick={(e) => {
        // overlay click closes
        console.log("overlay clicked");
        closeModal();
      }}
    >
      <div
        className="contact-modal-container"
        onClick={(e) => {
          e.stopPropagation(); // keep clicks inside
          // debug: log that click reached container
          console.log("modal container clicked");
        }}
        role="dialog"
        aria-modal="true"
      >
        <div className="contact-modal-header">
          <h2>Contact Us</h2>
          <button
            className="close-btn"
            onClick={(e) => {
              e.stopPropagation();
              console.log("close clicked");
              closeModal();
            }}
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
        </div>

        <p className="contact-desc">Have a question? Fill out the form below.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            autoFocus
            onFocus={() => console.log("name input focused")}
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            onFocus={() => console.log("email input focused")}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            onFocus={() => console.log("message textarea focused")}
          />

          <button type="submit" className="btn-gradient" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && <p className="status-msg">{status}</p>}
      </div>
    </div>
  );
};

export default ContactModal;
