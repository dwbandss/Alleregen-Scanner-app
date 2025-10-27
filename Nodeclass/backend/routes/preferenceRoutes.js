import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getPreferences, savePreferences } from "../controller/preferencesController.js";

const router = express.Router();

router.get("/", protect, getPreferences);
router.post("/", protect, savePreferences);

export default router;