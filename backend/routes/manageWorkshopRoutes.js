import express from 'express';
import { getWorkshops, deleteWorkshop } from '../controllers/manageworkshopController.js'; // Import controller functions

const router = express.Router();

// Route to get all workshops
router.get('/workshops', getWorkshops);

// Route to delete a workshop by ID
router.delete('/workshops/:id', deleteWorkshop);

export default router;