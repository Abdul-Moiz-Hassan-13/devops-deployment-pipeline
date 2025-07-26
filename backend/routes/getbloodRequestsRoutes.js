// routes/bloodRequests.js
import express from 'express';
import { getAllBloodRequests } from '../controllers/getBloodRequestsController.js';  // Correct named import

const router = express.Router();

// Route to get all blood requests
router.get('/all', getAllBloodRequests);  // Call the controller function

export default router;
