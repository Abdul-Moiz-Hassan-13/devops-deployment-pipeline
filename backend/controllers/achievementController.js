import Donor from '../models/Donor.js';  // Import Donor model

export const getAchievements = async (req, res) => {
  try {
    const donorId = req.user.id;  // Use the donor ID from req.user (decoded JWT)
    console.log('Fetching achievements for donor ID:', donorId);

    // Find the donor by donorId
    const donor = await Donor.findById(donorId);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Count the number of donations and total blood donated
    const numDonations = donor.donationHistory.length;
    const totalBloodDonated = donor.donationHistory.reduce((total, donation) => total + 0.5, 0);

    // Define milestones
    const milestones = [
      { title: 'Donated 3 times', achieved: numDonations >= 3 },
      { title: 'Donated 5 times', achieved: numDonations >= 5 },
      { title: 'Donated 10 times', achieved: numDonations >= 10 },
      { title: 'Donated 0.5 liters of blood', achieved: totalBloodDonated >= 0.5 },
      { title: 'Donated 1 liter of blood', achieved: totalBloodDonated >= 1 }
    ];

    // Level is based on the number of donations
    const level = numDonations;
    const benefits = getLevelBenefits(level);

    return res.json({
      milestones,
      level,
      benefits,
    });

  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ message: 'Error fetching achievements' });
  }
};

// Helper function to return benefits based on donor level
function getLevelBenefits(level) {
  const benefits = {
    1: 'Free Health Check-ups',
    2: 'Priority Access to Health Services',
    3: 'Transportation Discounts',
    4: 'Health and Wellness Membership',
    5: 'Long-Term Health Insurance Discounts',
  };
  return benefits[level] || 'No benefits available';
}