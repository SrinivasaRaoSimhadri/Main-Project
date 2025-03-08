import express from "express";
import { getProfile, postDetails, getDetails, DeleteEducationDetails, DeleteExperienceDetails } from "../controllers/ProfileControllers.js";

const router = express.Router();

router.post("/DeleteEducationDetails",  DeleteEducationDetails);
router.post("/DeleteExperienceDetails",  DeleteExperienceDetails);

router.get("/profile", getProfile);

router.post("/:info", postDetails);

router.get("/:path", getDetails);


export default router;