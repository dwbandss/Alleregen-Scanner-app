// import React from "react";
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
  const weeklyData = [
    { day: "Mon", scans: 40 },
    { day: "Tue", scans: 55 },
    { day: "Wed", scans: 35 },
    { day: "Thu", scans: 70 },
    { day: "Fri", scans: 60 },
    { day: "Sat", scans: 45 },
    { day: "Sun", scans: 40 },
  ];

  const allergenData = [
    { name: "Dairy", value: 25 },
    { name: "Eggs", value: 20 },
    { name: "Gluten", value: 15 },
    { name: "Nuts", value: 25 },
    { name: "Soy", value: 15 },
  ];
  const COLORS = ["#A8E6CF", "#56CC9D", "#FFD166", "#FFB347", "#FF9AA2"];

  const foodData = [
    { category: "Snacks", safe: 80, unsafe: 20 },
    { category: "Dairy", safe: 45, unsafe: 55 },
    { category: "Grains", safe: 90, unsafe: 10 },
    { category: "Proteins", safe: 85, unsafe: 15 },
    { category: "Beverages", safe: 80, unsafe: 20 },
  ];

  return (
    <div className="reports-container">
      <h1 className="reports-title">Reports & Analytics</h1>
      <p className="reports-subtitle">
        Detailed insights into your allergen scanning patterns
      </p>

      <div className="reports-cards">
        <div className="report-card">
          <p className="card-label">Total Scans</p>
          <h2 className="card-value">1,247</h2>
          <p className="card-change positive">+12.5% vs last month</p>
        </div>

        <div className="report-card">
          <p className="card-label">Allergens Detected</p>
          <h2 className="card-value warning">23</h2>
          <p className="card-change negative">-8.3% vs last month</p>
        </div>

        <div className="report-card">
          <p className="card-label">Safe Foods</p>
          <h2 className="card-value success">94.2%</h2>
          <p className="card-change positive">+3.1% vs last month</p>
        </div>

        <div className="report-card">
          <p className="card-label">Risk Alerts</p>
          <h2 className="card-value danger">5</h2>
          <p className="card-change negative">-2 vs last month</p>
        </div>
      </div>

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
