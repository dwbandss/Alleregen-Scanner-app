import React from "react";
import "./QuickScan.css";

function QuickScan() {
  return (
    <div className="quickscan-container">
      <div className="quickscan-header">
        <h2>Quick Scan</h2>
        <p>Upload a photo or scan a barcode to check for allergens</p>
      </div>

      <div className="quickscan-content">
        <div className="upload-section">
          <h3>Quick Scan</h3>
          <p>Upload an image or scan a barcode to check for allergens</p>

          <div className="upload-box">
            <div className="upload-icon">⬆️</div>
            <p className="upload-text">
              Drop your file here <br />
              <span>or click to browse from your device</span>
            </p>

            <div className="upload-buttons">
              <button className="photo-btn">📷 Take Photo</button>
              <button className="barcode-btn">📡 Scan Barcode</button>
            </div>

            <p className="upload-note">
              Supported formats: JPG, PNG, PDF • Max size: 10MB
            </p>
          </div>
        </div>

        <div className="score-section">
          <h3>Food Safety Score</h3>
          <div className="score-circle">
            <div className="circle-inner">
              <span className="score-percent">94.2%</span>
              <span className="score-label">Safe</span>
            </div>
          </div>
          <p className="based-text">Based on recent scans</p>

          <div className="progress-list">
            <div className="progress-item">
              <span>Gluten-Free</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "98%" }}></div>
              </div>
              <span className="percent">98%</span>
            </div>

            <div className="progress-item">
              <span>Dairy-Free</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "92%" }}></div>
              </div>
              <span className="percent">92%</span>
            </div>

            <div className="progress-item">
              <span>Nut-Free</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "87%" }}></div>
              </div>
              <span className="percent">87%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickScan;
