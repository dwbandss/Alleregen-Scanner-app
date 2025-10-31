import mongoose from "mongoose";

const ScanSchema = new mongoose.Schema({
  foodItem: { type: String, required: true },
  allergens: { type: [String], default: [] },
  safetyStatus: {
    type: String,
    enum: ["Safe", "Moderate", "Unsafe"],
    required: true,
  },
  safetyPercent: { type: Number, required: true },
  dateTime: { type: Date, default: Date.now },
});

export default mongoose.model("Scan", ScanSchema);
