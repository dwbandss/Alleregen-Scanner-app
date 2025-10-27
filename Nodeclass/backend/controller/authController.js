import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import jwt from "jsonwebtoken";


// @desc Register a new user
// @route POST /api/auth/register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = crypto.randomBytes(32).toString("hex");

    res.status(200).json({ message: "User registered successfully" , token: token });

  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// @desc Login user
// @route POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

     const token = crypto.randomBytes(32).toString("hex");

     res.status(200).json({ message: "User loggedIn successfully" , token: token });

  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

// @desc Get current logged-in user
// @route GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};