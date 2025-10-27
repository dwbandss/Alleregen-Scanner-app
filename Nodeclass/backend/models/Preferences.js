import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  allergens: [
    {
      name: String,
      risk: { type: String, enum: ["high", "moderate"], default: "moderate" },
      enabled: { type: Boolean, default: false },
    },
  ],
});

export default mongoose.model("Preference", preferenceSchema);