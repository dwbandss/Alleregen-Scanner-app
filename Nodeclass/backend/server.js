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

dotenv.config();

mongoose.connect('mongodb+srv://chinky:chinky@nmiet.0djtsyj.mongodb.net/?retryWrites=true&w=majority&appName=Nmiet')
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));