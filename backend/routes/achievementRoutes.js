import express from 'express';  
import { getAchievements } from '../controllers/achievementController.js';  // Import the getAchievements function
import { authenticateDonor } from '../middleware/auth.js';  // Import the authentication middleware

const router = express.Router();

// Route to get achievements for the logged-in donor (protected by JWT token)
router.get('/achievements', authenticateDonor, getAchievements);  // Protected by authenticateDonor middleware

export default router;