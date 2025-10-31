// import express from 'express';
// import mongoose from 'mongoose';
// import router from './routes/userRoutes.js';
// import cors from "cors";

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use(router);

// mongoose.connect('mongodb+srv://chinky:chinky@nmiet.0djtsyj.mongodb.net/?retryWrites=true&w=majority&appName=Nmiet')
//   .then(() => console.log('Connected!'));


// app.listen(8000 , ()=>{
//   console.log("Listening to port 8000");
// })  



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import preferenceRoutes from "./routes/preferenceRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

mongoose.connect('mongodb+srv://Bandana:hellobandana@cluster0.748vw2c.mongodb.net/?appName=Cluster0')
 .then(() => console.log('Connected!'));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api/scans", scanRoutes);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define your system instruction (the AI's role)
const systemInstruction =
  "You are an AI allergen assistant that helps users identify food allergens and provide safety advice clearly and accurately.";

// --- 3. UPDATE THE /api/ask ENDPOINT ---
app.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ answer: "⚠ Error: No question provided." });
  }

  try {
    // Get the Gemini model, passing in the system instruction
    const model = genAI.getGenerativeModel({
      model: "gemini-pro-latest", // Use a fast and capable model
      systemInstruction: systemInstruction,
    });

    // Start a chat session (even for a single question)
    const chat = model.startChat({
      history: [], // No previous history for this request
    });

    // Send the user's question to the chat
    const result = await chat.sendMessage(question);

    // Get the AI's response
    const response = result.response;
    const answer = response.text();

    // Send the answer back to the client
    res.json({
      answer: answer.trim(),
    });

  } catch (error) {
    // Update the error message
    console.error("Error from Gemini:", error);
    res.status(500).json({ answer: "⚠ Error: Unable to fetch AI response." });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));