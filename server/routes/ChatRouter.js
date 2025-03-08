import express from 'express';
import { getPrivateMessages, getYourGroups, getLearnGroups, createGroup, getGroupMessages } from '../controllers/ChatController.js';

const router = express.Router();

router.post("/getGroupMessages", getGroupMessages);
router.post("/createGroup", createGroup);
router.post("/getPrivateMessages", getPrivateMessages);
router.get("/getYourGroups", getYourGroups);
router.get("/getLearnGroups", getLearnGroups);

export default router;