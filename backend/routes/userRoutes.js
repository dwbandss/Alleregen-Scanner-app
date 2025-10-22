import express from "express";
import { LoginUser, registerUser } from "../controller/usercontroller.js";

const router = express.Router(); 


router.post("/register", registerUser);
router.post("/login",LoginUser);

export default router;
