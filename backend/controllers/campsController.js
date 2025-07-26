import BloodReceivingCamp from '../models/BloodReceivingCamp.js';  // Import the model

// Controller to get all blood receiving camps
export const getBloodCamps = async (req, res) => {
  try {
    const camps = await BloodReceivingCamp.find();  // Fetch all camps from the database
    res.status(200).json(camps);  // Send the camps as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch blood receiving camps' });
  }
};

// Controller function to delete a blood camp by ID
export const deleteBloodCamp = async (req, res) => {
    const campId = req.params.id; // Get the ID from the URL parameter
    try {
      const camp = await BloodReceivingCamp.findByIdAndDelete(campId); // Find and delete the blood camp by ID
      if (!camp) {
        return res.status(404).json({ message: 'Blood camp not found' });
      }
      res.status(200).json({ message: 'Blood camp deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting blood camp', error: error.message });
    }
  };