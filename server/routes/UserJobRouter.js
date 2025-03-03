import express from "express";
import { getUserAppliedJobs, getExploreJobs, getExamData, Apply } from "../controllers/UserJobControllers.js";

const router = express.Router();

router.get("/getUserAppliedJobs", getUserAppliedJobs);
router.get("/getExploreJobs", getExploreJobs);
router.post("/getExamData", getExamData);
router.post("/Apply", Apply);

export default router;