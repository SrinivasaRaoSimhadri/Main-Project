import express from "express";
import { getOrganisations, followOrganisation, unfollowOrganisation, followingOrganisations } from "../controllers/UserOrganisationController.js";

const router = express.Router();

router.get("/getOrganisations", getOrganisations);
router.post("/followOrganisation", followOrganisation);
router.post("/unfollowOrganisation", unfollowOrganisation);
router.get("/followingOrganisations", followingOrganisations);

export default router;