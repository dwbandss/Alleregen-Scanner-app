import Scan from "../models/Scan.js";

export const getRecentScans = async (req, res) => {
  try {
    const scans = await Scan.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(5);
    res.json(scans);
  } catch {
    res.status(500).json({ message: "Error fetching scans" });
  }
};

export const addNewScan = async (req, res) => {
  try {
    const { productName, status } = req.body;
    const scan = new Scan({ user: req.user._id, productName, status });
    await scan.save();
    res.json({ message: "Scan added", scan });
  } catch {
    res.status(500).json({ message: "Error adding scan" });
  }
};