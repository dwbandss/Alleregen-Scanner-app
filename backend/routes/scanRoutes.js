


import express from "express";
import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import Scan from "../models/Scan.js";
import protect from "../middleware/authMiddleware.js";

dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Helper function to compute safety %
const calculateSafety = (matchedCount, total) => {
  if (matchedCount === 0) return 100;
  const risk = Math.min((matchedCount / total) * 100, 100);
  return Math.max(0, 100 - risk * 1.5);
};

// Gemini API info
const FOOD_SCAN_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const FOOD_SCAN_API_KEY = process.env.FOOD_SCAN_API_KEY; // or FOOD_SCAN_API_KEY

router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const userId = req.user._id || req.user.id;

    // Read image and encode as Base64
    const imageBase64 = fs.readFileSync(req.file.path, { encoding: "base64" });

    const allergens = [
      { name: "Gluten-Free", confidence: Math.floor(Math.random() * 20) + 80 },
      { name: "Dairy-Free", confidence: Math.floor(Math.random() * 20) + 75 },
      { name: "Nut-Free", confidence: Math.floor(Math.random() * 20) + 70 },
    ];

// Call Gemini API (use single request that passes key in the URL)
const apiResponse = await axios.post(
  `${FOOD_SCAN_API_URL}?key=${FOOD_SCAN_API_KEY}`,
  {
    contents: [
      {
        parts: [
          { text: "Identify all visible ingredients or allergens in this food photo. we are attaching/sharing user allegrens list and cofnidence " + JSON.stringify(allergens) + ". compare the ingredients present in scanned food and user allergens and tell us if food is safe for user or not. if not safe mention allegens. " },
          {
            inline_data: {
              mime_type: req.file.mimetype,
              data: imageBase64,
            },
          },
        ],
      },
    ],
  },
  { headers: { "Content-Type": "application/json" } }
);

// 🧠 Debug log to inspect what Gemini returns
console.log("🧠 Gemini API Raw Response:");
console.log(JSON.stringify(apiResponse.data, null, 2));

    // Parse Gemini output
    const aiText =
      apiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No allergens detected";

    const detectedAllergens = aiText.split(",").map((a) => a.trim());

    // Random safety % logic (you can refine later)
    const safetyPercent = Math.floor(Math.random() * 40) + 60;
    const safetyStatus =
      safetyPercent > 90
        ? "Safe"
        : safetyPercent > 75
        ? "Moderate"
        : "Unsafe";

    const newScan = new Scan({
      user: userId,
      foodItem: req.file.originalname.split(".")[0],
      allergens: detectedAllergens,
      safetyStatus,
      safetyPercent,
      imagePath: req.file.path,
    });

    await newScan.save();

    res.status(200).json({
      message: "Scan completed successfully",
      foodItem: req.file.originalname,
      safetyPercent,
      safetyStatus,
      detectedAllergens,
      aiText,
      savedScan: newScan,
    });
  } catch (error) {
    console.error("Error processing scan:", error.response?.data || error.message);
    res.status(500).json({
      message: "Error processing scan",
      error: error.response?.data || error.message,
    });
  }
});

export default router;
