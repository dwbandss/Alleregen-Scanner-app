import Scan from "../models/Scan.js";

export const getUserDashboard = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({
      message: "Dashboard data fetched successfully",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  } catch (error) {
    console.error("Error in getUserDashboard:", error);
    res.status(500).json({ message: "Server error in getUserDashboard" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const total = await Scan.countDocuments({ user: req.user._id });
    const safe = await Scan.countDocuments({ user: req.user._id, status: "safe" });
    const warnings = await Scan.countDocuments({ user: req.user._id, status: "warning" });

    res.json({ total, safe, warnings });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Error fetching stats" });
  }
};
