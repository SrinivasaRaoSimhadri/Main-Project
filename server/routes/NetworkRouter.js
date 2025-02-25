import express from "express";
import { followers, following, unfollow, Explore, follow } from "../controllers/NetworkController.js";

const router = express.Router();

router.get("/followers", followers);
router.get("/following", following);
router.get("/explore", Explore);
router.post("/unfollow", unfollow);
router.post("/follow", follow);

export default router;