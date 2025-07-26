import express from 'express';
import { getBloodCamps, deleteBloodCamp } from '../controllers/campsController.js'; // Import the controller functions

const router = express.Router();

// Route to get all blood camps
router.get('/blood-camps', getBloodCamps);

// Route to delete a blood camp by ID
router.delete('/blood-camps/:id', deleteBloodCamp);



export default router;