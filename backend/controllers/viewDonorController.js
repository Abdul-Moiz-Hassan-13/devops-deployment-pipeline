import Request from '../models/AcceptRequest.js';  // Import the AcceptRequest model
import Recipient from '../models/Recipient.js';  // Import the Recipient model

// Function to get accepted donors for a specific recipient
export const getAcceptedDonors = async (req, res) => {
  try {
    // Get recipient ID from the request object (populated by the middleware)
    const recipientId = req.recipientId;
    console.log('Recipient ID:', recipientId); // Log the recipientId for debugging

    // Fetch recipient email using recipId
    const recipient = await Recipient.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const recipientEmail = recipient.email;
    console.log('Recipient Email:', recipientEmail);  // Log the recipient email for debugging

    // Fetch all requests where the recipient's email matches and the status is 'Accepted'
    const requests = await Request.find({ recipientEmail: recipientEmail, status: 'Accepted' });

    console.log('Requests:', requests);  // Debugging step: Check if requests are returned

    // Check if any requests were found
    if (requests.length === 0) {
      return res.status(404).json({ message: 'No accepted requests found for this recipient.' });
    }

    // Extract donor details from the accepted requests
    const donors = requests.map(request => ({
      donorName: request.donorName,  // You can include other donor info like donorEmail etc.
      donorEmail: request.donorEmail,
      donorPhoneNumber: request.donorPhoneNumber,
    }));

    // Send back the donor list as the response
    res.status(200).json(donors);
  } catch (error) {
    console.error('Error fetching accepted donors:', error);
    res.status(500).json({ error: 'Failed to fetch accepted donors' });  // Internal server error
  }
};
