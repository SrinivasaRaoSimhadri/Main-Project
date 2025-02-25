import express from "express";
import { getProfile, postDetails, getDetails } from "../controllers/ProfileControllers.js";

const router = express.Router();

router.get("/profile", getProfile);

router.post("/:info", postDetails);

router.get("/:path", getDetails);

export default router;