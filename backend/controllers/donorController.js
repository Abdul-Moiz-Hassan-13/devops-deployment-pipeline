import jwt from 'jsonwebtoken';  // ES Module import
import bcrypt from 'bcryptjs';  // ES Module import
import Donor from '../models/Donor.js';  // Ensure to use .js for local imports
import multer from 'multer';
import path from 'path';

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Use current timestamp as filename to avoid conflicts
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with storage config and file size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Max file size of 10MB
}).single('profilePic');  // Expecting the field to be named 'profilePic'

// Register donor
export const registerDonor = async (req, res) => {
  try {
    const { name, email, password, bloodType } = req.body;

    // Check if donor already exists
    let donor = await Donor.findOne({ email });

    if (donor) {
      return res.status(400).json({ message: "Donor already exists" });
    }

    // Hash the password before saving (only for regular email/password login)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new donor record
    donor = new Donor({
      name,
      email,
      password: hashedPassword,
      bloodType,
      profilePic: '', // Set a default value for profile picture
    });

    // Save the donor to the database
    await donor.save();

    // Generate a JWT token for the newly registered donor
    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token back to the client
    res.status(201).json({ token });
  } catch (err) {
    console.error('Error during donor registration:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Donor login (existing function)
export const loginDonor = async (req, res) => {
  try {
    const { email, password} = req.body;

    // If it's a regular login (non-Google), proceed with normal logic
    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(400).json({ message: "Donor not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token for regular donor
    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Send the token for the regular donor
    res.json({ token });

  } catch (err) {
    console.error('Error during donor login:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Dashboard route (To show donor data or temp user data)
export const getDashboard = async (req, res) => {
    try {
      // Get the token from the header (assumed to be in Bearer format)
      const token = req.headers.authorization.split(' ')[1]; // Format: 'Bearer token'
  
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      // Verify the token using jwt
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  // Use your JWT_SECRET here
      const donorId = decodedToken.id;  // Decoding the donor id from the token
  
      // Try to find the donor in the database
      const donor = await Donor.findById(donorId);
  
      if (donor) {
        return res.status(200).json({
          message: 'Welcome to the donor dashboard',
          user: {
            name: donor.name,
            email: donor.email,
            bloodType: donor.bloodType,
            profilePic: donor.profilePic,
          },
        });
      } else {
        return res.status(404).json({ message: 'Donor not found' });
      }
  
    } catch (error) {
      console.error('Error in dashboard route:', error);
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  };

// Profile route (Fetching donor profile info)
export const getProfile = async (req, res) => {
    try {
      // Get the token from the header (assumed to be in Bearer format)
      const token = req.headers.authorization.split(' ')[1]; // Format: 'Bearer token'
  
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      // Verify the token using jwt
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  // Use your JWT_SECRET here
      const donorId = decodedToken.id;  // Decoding the donor id from the token
  
      // Try to find the donor in the database
      const donor = await Donor.findById(donorId);
  
      if (donor) {
        return res.status(200).json({
          user: {
            name: donor.name,
            email: donor.email,
            bloodGroup: donor.bloodType, // You have bloodType in the model
            location: donor.location,    // Assuming `location` is available in the Donor model
            image: donor.image,
          },
        });
      } else {
        return res.status(404).json({ message: 'Donor not found' });
      }
  
    } catch (error) {
      console.error('Error in profile route:', error);
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  };

  export const uploadProfilePic = (req, res) => {
    upload(req, res, async (err) => {
  
      const donorId = req.donorId;  // Assuming donorId is extracted from authentication middleware
      try {
        // Save the uploaded image path to the donor's profile in the database
        const updatedDonor = await Donor.findByIdAndUpdate(
          donorId,
          { image: `/uploads/${req.file.filename}` },  // Save the file path in DB (image field)
          { new: true }
        );
  
        if (!updatedDonor) {
          return res.status(404).json({ message: 'Donor not found' });
        }
  
        return res.status(200).json({
          message: 'Profile picture uploaded successfully',
          image: `/uploads/${req.file.filename}`,  // Return the image path
        });
      } catch (error) {
        console.error('Error updating profile picture:', error);
        return res.status(500).json({ message: 'Error updating profile picture' });
      }
    });
  };

// Delete Account
export const deleteAccount = async (req, res) => {
    try {
      const donorId = req.donorId;  // This will now be set by the authenticateDonor middleware
  
      const donor = await Donor.findByIdAndDelete(donorId);
  
      if (!donor) {
        return res.status(404).json({ message: 'Donor not found' });
      }
  
      return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Error deleting account:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

// Profile update
export const updateProfile = async (req, res) => {
  
  try {
    const donorId = req.donorId;  // Extract donorId from the authentication middleware
    const { location, bloodGroup } = req.body;  // Extract location and bloodGroup from the request body

    // Prepare the data to be updated
    const updateData = {};
    if (location) {
      updateData.location = location;
    }
    if (bloodGroup && !req.donor.bloodGroup) {
      updateData.bloodGroup = bloodGroup; // Allow update only if bloodGroup is empty
    }

    // Find and update the donor profile in the database
    const updatedDonor = await Donor.findByIdAndUpdate(donorId, updateData, { new: true });

    if (!updatedDonor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Return the updated donor data in the response
    return res.status(200).json({
      message: 'Profile updated successfully',
      donor: updatedDonor,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get all donors
export const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find(); // Fetch all donors from the database
    res.status(200).json(donors); // Send the donor data as JSON
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error: error.message });
  }
}

export const deleteDonor = async (req, res) => {
  const donorId = req.params.id; // Get the ID from the URL parameter
  try {
    const donor = await Donor.findByIdAndDelete(donorId); // Find and delete donor by ID
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.status(200).json({ message: 'Donor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting donor', error: error.message });
  }
};
