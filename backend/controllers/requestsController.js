import BloodRequest from '../models/BloodRequest.js'; // Assuming the model is in the 'models' directory

// Controller function to get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find(); // Fetch all blood requests from the database
    res.status(200).json(requests); // Send the requests data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error: error.message });
  }
};

// Controller function to delete a specific request
export const deleteRequest = async (req, res) => {
  const requestId = req.params.id; // Get the ID from the URL parameter
  try {
    const request = await BloodRequest.findByIdAndDelete(requestId); // Find and delete the request by ID
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting request', error: error.message });
  }
};