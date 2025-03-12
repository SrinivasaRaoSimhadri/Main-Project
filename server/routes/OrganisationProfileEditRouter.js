import express from 'express';
import { updateAbout, updateImage } from '../controllers/OrganisationProfileEdit.js';

const router = express.Router();

router.post('/updateAbout', updateAbout);
router.post("/updateImage", updateImage);

export default router;