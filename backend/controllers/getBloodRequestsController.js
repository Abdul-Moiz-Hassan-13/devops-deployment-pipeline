// controllers/getBloodRequestsController.js
import BloodRequest from '../models/BloodRequest.js';  // Import the BloodRequest model

// Controller function to get all blood requests
export const getAllBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find();  // Fetch all blood requests from the database
    res.status(200).json(requests);  // Send the result back as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch blood requests' });  // Send an error message if the DB query fails
  }
};