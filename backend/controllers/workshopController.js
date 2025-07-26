import Workshop from '../models/Workshop.js';  // Import the Workshop model

// Controller to fetch all workshops from the database
export const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find();  // Fetch all workshops
    res.json(workshops);  // Return the list of workshops as JSON
  } catch (error) {
    console.error('Error fetching workshops:', error);
    res.status(500).json({ message: 'Error fetching workshops' });
  }
};
