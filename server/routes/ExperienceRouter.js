import express from 'express';
import { postExperience, deleteExperience, getLoggedUserPosts, AllExperiencePosts } from "../controllers/ExperienceController.js";

const router = express();

router.post("/postExperience", postExperience);
router.delete("/deleteExperience/:id", deleteExperience);
router.get("/getLoggedUserPosts", getLoggedUserPosts);
router.get("/AllExperiencePosts", AllExperiencePosts);

export default router;