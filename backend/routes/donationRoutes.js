// backend/routes/donationRoutes.js
import express from 'express';  // Importing express
import { addDonation, getDonationHistory } from '../controllers/donationController.js';  // Import named functions

const router = express.Router();    

// Route to add a donation to the donor's donation history
router.post('/donate', addDonation);

// Route to get donation history by donor email
router.get('/history/:donorEmail', getDonationHistory);

export default router;  // Use default export instead of module.exports
