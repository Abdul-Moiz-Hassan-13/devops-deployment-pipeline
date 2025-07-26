import express from 'express';
import { getAllCamps } from '../controllers/bloodCampController.js';  // Import the controller

const router = express.Router();

// Route to fetch all blood receiving camps
router.get('/camps', getAllCamps);

export default router;
