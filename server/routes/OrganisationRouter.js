import express from "express";
import { postJob, getJobs, closeApplication, hirings, closeHiring } from "../controllers/OrganisationController.js";

const router = express.Router();

router.post("/postjob", postJob);
router.get("/getJobs", getJobs);
router.post("/closeApplication", closeApplication);
router.get("/hirings", hirings);
router.post("/closeHiring", closeHiring);

export default router;