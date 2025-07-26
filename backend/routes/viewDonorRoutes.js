import express from 'express';
import { authenticateRecipient } from '../middleware/auth.js';  // Import the middleware
import { getAcceptedDonors } from '../controllers/viewDonorController.js';  // Import the controller

const router = express.Router();

// GET route to fetch donors by recipient's ID
router.get('/recipients/donors', authenticateRecipient, getAcceptedDonors); // Middleware attached here

export default router;
