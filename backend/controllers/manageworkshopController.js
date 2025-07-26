import Workshop from '../models/Workshop.js'; // Import the Workshop model

// Controller function to get all workshops
export const getWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find(); // Fetch all workshops from the database
    res.status(200).json(workshops); // Send the workshops data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workshops', error: error.message });
  }
};

// Controller function to delete a workshop by ID
export const deleteWorkshop = async (req, res) => {
  const workshopId = req.params.id; // Get the ID from the URL parameter
  try {
    const workshop = await Workshop.findByIdAndDelete(workshopId); // Find and delete the workshop by ID
    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }
    res.status(200).json({ message: 'Workshop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workshop', error: error.message });
  }
};