// backend/controllers/donationController.js
import Donor from '../models/Donor.js'; // Importing Donor model

// Controller to add a donation to the donor's donation history
export const addDonation = async (req, res) => {
  const { email, bloodType, quantity } = req.body; // Donation details from the request body

  try {
    // Find donor by email
    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Create donation object
    const donation = {
      donationDate: new Date(),
      bloodType,
      quantity,
      status: 'successful', // Default status
    };

    // Add the donation to the donor's history
    donor.donationHistory.push(donation);

    // Save the donor with the updated donation history
    await donor.save();

    res.status(200).json({ message: 'Donation recorded successfully' });
  } catch (error) {
    console.error('Error adding donation:', error);
    res.status(500).json({ message: 'Server error while adding donation' });
  }
};

// Controller to fetch donation history for a specific donor by email
export const getDonationHistory = async (req, res) => {
  const { donorEmail } = req.params;

  try {
    const donor = await Donor.findOne({ email: donorEmail });

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.json(donor.donationHistory);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).json({ message: 'Failed to fetch donation history' });
  }
};
