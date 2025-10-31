import React, { useState } from "react";
import "./Aiassients.css";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";

function AIScreen() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! I’m your AI allergen assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ask", {
        question: input,
      });

      const botMsg = { sender: "bot", text: res.data.answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const botMsg = { sender: "bot", text: "⚠ Sorry, I couldn’t get a response right now." };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-layout">
      <div className="chat-section">
        <h2>AI Assistant</h2>
        <p className="subtitle">Get instant answers about allergens, foods, and safety</p>

        <div className="chat-box">
          {messages.map((m, i) => (
            <div key={i} className={`chat-message ${m.sender}`}>
              <p>{m.text}</p>
            </div>
          ))}
          {loading && <div className="chat-message bot"><p>🤖 Thinking...</p></div>}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask about allergens..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>
            <FaPaperPlane size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIScreen;