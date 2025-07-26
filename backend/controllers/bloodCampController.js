import BloodReceivingCamp from '../models/BloodReceivingCamp.js';  // Import the model

// Controller to get all blood receiving camps
export const getAllCamps = async (req, res) => {
  try {
    const camps = await BloodReceivingCamp.find();  // Fetch all camps from the database
    res.status(200).json(camps);  // Send the camps as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch blood receiving camps' });
  }
};
