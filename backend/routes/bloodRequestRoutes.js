import express from 'express';
import { authenticateRecipient } from '../middleware/auth.js'; // Import the authentication middleware
import BloodRequest from '../models/BloodRequest.js';  // Import BloodRequest model

const router = express.Router();

// POST route to handle blood request
router.post('/', authenticateRecipient, async (req, res) => {
  const { 
    name, 
    email, 
    age, 
    gender, 
    phoneNumber, 
    address, 
    bloodLitersRequired, 
    bloodType, 
    receiveBloodAtDoorstep  // Destructure the receiveBloodAtDoorstep field
  } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !age || !gender || !phoneNumber || !address || !bloodLitersRequired || !bloodType || receiveBloodAtDoorstep === undefined) {
    return res.status(400).json({ message: 'All fields are required, including receiveBloodAtDoorstep.' });
  }

  try {
    // Create a new blood request
    const newRequest = new BloodRequest({
      name,
      email,
      age,
      gender,
      phoneNumber,
      address,
      bloodLitersRequired,
      bloodType,
      receiveBloodAtDoorstep,  // Include the new field here
      recipientId: req.recipientId,  // Assuming `recipientId` is passed via the token
    });

    // Save the blood request to the database
    await newRequest.save();

    // Send success response
    res.status(201).json({
      message: 'Blood request successfully created',
      request: newRequest,
    });
  } catch (error) {
    console.error('Error processing blood request:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
});

// Export the routes
export default router;
