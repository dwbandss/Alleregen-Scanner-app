import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getRecentScans, addNewScan } from "../controller/scanController.js";

const router = express.Router();

router.get("/recent", protect, getRecentScans);
router.post("/new", protect, addNewScan);

export default router;