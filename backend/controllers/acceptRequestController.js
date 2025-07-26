import BloodRequest from '../models/BloodRequest.js';  // Import the BloodRequest model
import Request from '../models/AcceptRequest.js';  // Import the Request model
import Donor from '../models/Donor.js';  // Import the Donor model
import { sendNotification } from '../utils/emailHelper.js'; // Import the sendNotification function

// Controller to accept a blood request and send email notifications
export const acceptRequest = async (req, res) => {
  try {
    const requestId = req.params.id;  // Get the request ID from params
    const donorId = req.user.id;  // Assuming the donor's ID is available from the JWT token

    // Find the blood request by ID
    const bloodRequest = await BloodRequest.findById(requestId);

    if (!bloodRequest) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    // Fetch donor details from the database (assuming you have a Donor model)
    const donor = await Donor.findById(donorId);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Create a new Request entry with donor and recipient details
    const newRequest = new Request({
      recipientName: bloodRequest.name,
      recipientEmail: bloodRequest.email,
      recipientPhoneNumber: bloodRequest.phoneNumber,
      recipientBloodType: bloodRequest.bloodType,
      donorName: donor.name,  // Use the actual donor name
      donorEmail: donor.email,  // Use the actual donor email
      donorPhoneNumber: donor.phoneNumber,  // Use the actual donor phone number
      bloodLiters: bloodRequest.bloodLitersRequired,
    });

    // Save the accepted request to the database
    await newRequest.save();

    bloodRequest.status = 'Accepted';
    await bloodRequest.save();

    // Send email notifications to both the donor and the recipient
    const subject = `Blood Request Accepted: ${bloodRequest.name}`;
    
    // Email content for the donor
    const donorText = `Dear ${donor.name},\n\nYour blood donation request has been accepted. You can now contact the recipient at ${bloodRequest.email} for further arrangements.\n\nThank you for your generosity!`;
    
    // Email content for the recipient
    const recipientText = `Dear ${bloodRequest.name},\n\nYour blood request has been accepted. The donor, ${donor.name}, has agreed to donate ${bloodRequest.bloodLitersRequired} liters of blood.\n\nPlease contact the donor for further details.`;

    // Send email to the donor
    await sendNotification(donor.email, subject, donorText);
    
    // Send email to the recipient
    await sendNotification(bloodRequest.email, subject, recipientText);

    // Send a response back with the new request details
    res.status(200).json({ message: 'Blood request accepted successfully', request: newRequest });
  } catch (error) {
    console.error('Error accepting blood request:', error);
    res.status(500).json({ message: 'Error accepting blood request and sending email notifications' });
  }
};
