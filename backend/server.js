import express from 'express';
import mongoose from 'mongoose';
import router from './routes/userRoutes.js';
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

mongoose.connect('mongodb+srv://chinky:chinky@nmiet.0djtsyj.mongodb.net/?retryWrites=true&w=majority&appName=Nmiet')
  .then(() => console.log('Connected!'));


app.listen(8000 , ()=>{
  console.log("Listening to port 8000");
})  