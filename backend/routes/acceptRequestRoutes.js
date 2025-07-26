import express from 'express';
import { acceptRequest } from '../controllers/acceptRequestController.js';  // Import the controller function
import { authenticateDonor } from '../middleware/auth.js';  // Import authentication middleware

const router = express.Router();

// POST endpoint to accept a blood request
router.post('/accept/:id', authenticateDonor, acceptRequest);

export default router;
