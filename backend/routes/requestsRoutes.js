// requestsRoutes.js

import express from 'express';
import { getAllRequests, deleteRequest } from '../controllers/requestsController.js';

const router = express.Router();

// Route to get all blood requests
router.get('/requests', getAllRequests);

// Route to delete a specific blood request by ID
router.delete('/requests/:id', deleteRequest);

export default router;