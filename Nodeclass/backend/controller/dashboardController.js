import Scan from "../models/Scan.js";

export const getUserDashboard = async (req, res) => {
  try {
    res.json({
      message: "Dashboard data fetched",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const total = await Scan.countDocuments({ user: req.user._id });
    const safe = await Scan.countDocuments({ user: req.user._id, status: "safe" });
    const warnings = await Scan.countDocuments({ user: req.user._id, status: "warning" });

    res.json({ total, safe, warnings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};