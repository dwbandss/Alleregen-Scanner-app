import User from "../models/userModel.js";
import crypto from "crypto";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

 
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });

    }
  }

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // 2. Check password (currently plain text, should be hashed in real apps)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate token
    const token = crypto.randomBytes(32).toString("hex");

    res.status(200).json({ message: "User login successful" , token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};
