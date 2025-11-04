// import React from "react";
// import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import "./Reports.css";

const Reports = () => {
  const [summary, setSummary] = useState({
    totalScans: 0,
    allergensDetected: 0,
    safeFoods: 0,
    riskAlerts: 0,
    lastMonthChange: { totalScans: 0, allergensDetected: 0, safeFoods: 0, riskAlerts: 0 },
  });

  const [weeklyData, setWeeklyData] = useState([]);
  const [allergenData, setAllergenData] = useState([]);
  const [foodData, setFoodData] = useState([]);

  const COLORS = ["#A8E6CF", "#56CC9D", "#FFD166", "#FFB347", "#FF9AA2", "#9D84FF", "#84C1FF"];

  const calculateStats = () => {
    const stored = JSON.parse(localStorage.getItem("scanHistory")) || [];
    if (stored.length === 0) return;

    const now = new Date();
    const currentMonth = now.getMonth();
    const lastMonth = (currentMonth - 1 + 12) % 12;

    const currentMonthScans = stored.filter(
      s => new Date(s.dateTime).getMonth() === currentMonth
    );
    const lastMonthScans = stored.filter(
      s => new Date(s.dateTime).getMonth() === lastMonth
    );

    const totalScans = currentMonthScans.length;
    const prevTotal = lastMonthScans.length || 1;

    const allergensDetected = currentMonthScans.filter(s => s.allergens.length > 0).length;
    const prevAllergens = lastMonthScans.filter(s => s.allergens.length > 0).length || 1;

    const safeFoods =
      Math.round(
        (currentMonthScans.filter(s => s.safetyStatus === "Safe").length /
          (totalScans || 1)) *
          100
      ) || 0;

    const prevSafeFoods =
      Math.round(
        (lastMonthScans.filter(s => s.safetyStatus === "Safe").length /
          (lastMonthScans.length || 1)) *
          100
      ) || 0;

    const riskAlerts = currentMonthScans.filter(s => s.safetyStatus === "Risk").length;
    const prevRisks = lastMonthScans.filter(s => s.safetyStatus === "Risk").length || 1;

    const lastMonthChange = {
      totalScans: (((totalScans - prevTotal) / prevTotal) * 100).toFixed(1),
      allergensDetected: (((allergensDetected - prevAllergens) / prevAllergens) * 100).toFixed(1),
      safeFoods: (safeFoods - prevSafeFoods).toFixed(1),
      riskAlerts: (((riskAlerts - prevRisks) / prevRisks) * 100).toFixed(1),
    };

    setSummary({ totalScans, allergensDetected, safeFoods, riskAlerts, lastMonthChange });

    // === Weekly Scan Activity ===
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekCount = days.map(day => ({
      day,
      scans: stored.filter(s => days[new Date(s.dateTime).getDay()] === day).length,
    }));
    setWeeklyData(weekCount);

    // === Allergen Distribution ===
    const allergenMap = {};
    stored.forEach(s => {
      s.allergens.forEach(a => {
        allergenMap[a] = (allergenMap[a] || 0) + 1;
      });
    });
    const allergenArray = Object.keys(allergenMap).map(k => ({
      name: k,
      value: allergenMap[k],
    }));
    setAllergenData(allergenArray.length ? allergenArray : [{ name: "No Allergens", value: 1 }]);

    // === Food Categories ===
    const categoryMap = {};
    stored.forEach(s => {
      const cat = s.category || "Others";
      if (!categoryMap[cat]) categoryMap[cat] = { safe: 0, unsafe: 0 };
      if (s.safetyStatus === "Safe") categoryMap[cat].safe++;
      else categoryMap[cat].unsafe++;
    });

    const categoryArray = Object.keys(categoryMap).map(k => ({
      category: k,
      safe: categoryMap[k].safe,
      unsafe: categoryMap[k].unsafe,
    }));
    setFoodData(categoryArray);
  };

  useEffect(() => {
    calculateStats();
    window.addEventListener("scan-updated", calculateStats);
    return () => window.removeEventListener("scan-updated", calculateStats);
  }, []);

  const formatChange = val =>
    val > 0 ? `+${val}% vs last month` : `${val}% vs last month`;

  return (
    <div className="reports-container">
      <h1 className="reports-title">Reports & Analytics</h1>
      <p className="reports-subtitle">
        Detailed insights into your allergen scanning patterns
      </p>

      {/* ===== Summary Cards ===== */}
      <div className="reports-cards">
        <div className="report-card">
          <p className="card-label">Total Scans</p>
          <h2 className="card-value">{summary.totalScans}</h2>
          <p
            className={`card-change ${
              summary.lastMonthChange.totalScans >= 0 ? "positive" : "negative"
            }`}
          >
            {formatChange(summary.lastMonthChange.totalScans)}
          </p>
        </div>

        <div className="report-card">
          <p className="card-label">Allergens Detected</p>
          <h2 className="card-value warning">{summary.allergensDetected}</h2>
          <p
            className={`card-change ${
              summary.lastMonthChange.allergensDetected >= 0
                ? "positive"
                : "negative"
            }`}
          >
            {formatChange(summary.lastMonthChange.allergensDetected)}
          </p>
        </div>

        <div className="report-card">
          <p className="card-label">Safe Foods</p>
          <h2 className="card-value success">{summary.safeFoods}%</h2>
          <p
            className={`card-change ${
              summary.lastMonthChange.safeFoods >= 0 ? "positive" : "negative"
            }`}
          >
            {formatChange(summary.lastMonthChange.safeFoods)}
          </p>
        </div>

        <div className="report-card">
          <p className="card-label">Risk Alerts</p>
          <h2 className="card-value danger">{summary.riskAlerts}</h2>
          <p
            className={`card-change ${
              summary.lastMonthChange.riskAlerts >= 0 ? "positive" : "negative"
            }`}
          >
            {formatChange(summary.lastMonthChange.riskAlerts)}
          </p>
        </div>
      </div>

      {/* ===== Charts ===== */}
      <div className="chart-section">
        <div className="chart-card">
          <h3>Weekly Scan Activity</h3>
          <LineChart width={400} height={200} data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="scans"
              stroke="#2e7d32"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </div>

        <div className="chart-card">
          <h3>Allergen Distribution</h3>
          <PieChart width={400} height={200}>
            <Pie
              data={allergenData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={70}
              fill="#8884d8"
              label
            >
              {allergenData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className="chart-card full-width">
        <h3>Food Categories</h3>
        <BarChart width={800} height={300} data={foodData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="safe" fill="#2e7d32" name="Safe" />
          <Bar dataKey="unsafe" fill="#e53935" name="Unsafe" />
        </BarChart>
      </div>
    </div>
  );
};

export default Reports;
