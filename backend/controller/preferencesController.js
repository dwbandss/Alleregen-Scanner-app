import Preference from "../models/Preferences.js";

export const getPreferences = async (req, res) => {
  try {
    let prefs = await Preference.findOne({ user: req.user._id });
    if (!prefs) {
      prefs = new Preference({
        user: req.user._id,
        allergens: [
          { name: "Tree Nuts" },
          { name: "Peanuts" },
          { name: "Gluten" },
          { name: "Dairy" },
          { name: "Eggs" },
          { name: "Soy" },
          { name: "Shellfish" },
          { name: "Fish" },
          { name: "Sesame" },
          { name: "Sulfites" },
        ],
      });
      await prefs.save();
    }
    res.json(prefs);
  } catch {
    res.status(500).json({ message: "Error loading preferences" });
  }
};

export const savePreferences = async (req, res) => {
  try {
    const { allergens } = req.body;
    const prefs = await Preference.findOneAndUpdate(
      { user: req.user._id },
      { allergens },
      { new: true, upsert: true }
    );
    res.json({ message: "Preferences saved", prefs });
  } catch {
    res.status(500).json({ message: "Error saving preferences" });
  }
};