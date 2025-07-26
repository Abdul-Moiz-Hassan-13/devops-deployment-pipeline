const BloodRequest = require('../models/BloodRequest');

// Controller to handle blood request creation
exports.createBloodRequest = async (req, res) => {
  try {
    const { name, email, age, gender, phoneNumber, address, bloodLitersRequired, bloodType, receiveBloodAtDoorstep } = req.body;

    // Create new blood request
    const newRequest = new BloodRequest({
      name,
      email,
      age,
      gender,
      phoneNumber,
      address,
      bloodLitersRequired,
      bloodType,
      receiveBloodAtDoorstep, // Add the new field to the request
    });

    await newRequest.save();
    res.status(201).json({ message: 'Blood request created successfully!', request: newRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating blood request' });
  }
};
