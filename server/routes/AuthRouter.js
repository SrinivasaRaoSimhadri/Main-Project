import express from "express";
import { Login, RegisterUser } from "../controllers/AuthControllers.js";

const router = express.Router();

router.post("/login", Login);
router.post("/registerUser", RegisterUser);

export default router;