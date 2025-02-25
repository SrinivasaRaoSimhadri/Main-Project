import express from "express";
import { postJob } from "../controllers/OrganisationController.js";

const router = express.Router();

router.post("/postjob", postJob);

export default router;