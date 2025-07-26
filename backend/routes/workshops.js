import express from 'express';
import { getAllWorkshops } from '../controllers/workshopController.js';  // Import the controller

const router = express.Router();

// Define the route to get all workshops
router.get('/workshops', getAllWorkshops);

export default router;
