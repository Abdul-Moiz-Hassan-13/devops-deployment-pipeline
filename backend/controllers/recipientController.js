import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // ES Module import for bcrypt
import Recipient from '../models/Recipient.js';  // Local module import with .js extension
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

// Register recipient
export const registerRecipient = async (req, res) => {
  try {
    const { name, email, password, bloodType } = req.body;

    // Check if recipient already exists
    let recipient = await Recipient.findOne({ email });

    if (recipient) {
      return res.status(400).json({ message: "Recipient already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new recipient record
    recipient = new Recipient({
      name,
      email,
      password: hashedPassword,
      bloodType,
      image: '',  // Default profile picture
    });

    // Save the recipient to the database
    await recipient.save();

    // Generate a JWT token for the newly registered recipient
    const token = jwt.sign({ id: recipient._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token back to the client
    res.status(201).json({ token });
  } catch (err) {
    console.error('Error during recipient registration:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Recipient login
export const loginRecipient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const recipient = await Recipient.findOne({ email });
    if (!recipient) {
      return res.status(400).json({ message: "Recipient not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, recipient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token for the recipient
    const token = jwt.sign({ id: recipient._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Error during recipient login:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Dashboard route (to show recipient data)
export const getDashboard = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  // 'Bearer token'

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const recipientId = decodedToken.id;

    const recipient = await Recipient.findById(recipientId);

    if (recipient) {
      return res.status(200).json({
        message: 'Welcome to the recipient dashboard',
        user: {
          name: recipient.name,
          email: recipient.email,
          bloodType: recipient.bloodType,
          image: recipient.image,
        },
      });
    } else {
      return res.status(404).json({ message: 'Recipient not found' });
    }

  } catch (error) {
    console.error('Error in dashboard route:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

// Profile route (Fetching recipient profile info)
export const getProfile = async (req, res) => {
  try {
    // Get the token from the header (assumed to be in Bearer format)
    const token = req.headers.authorization.split(' ')[1]; // Format: 'Bearer token'

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token using jwt
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  // Use your JWT_SECRET here
    const recipientId = decodedToken.id;  // Decoding the recipient id from the token

    // Try to find the recipient in the database
    const recipient = await Recipient.findById(recipientId);

    if (recipient) {
      return res.status(200).json({
        user: {
          name: recipient.name,
          email: recipient.email,
          bloodGroup: recipient.bloodType, // You have bloodType in the model
          location: recipient.location,    // Assuming `location` is available in the Recipient model
          image: recipient.image,
        },
      });
    } else {
      return res.status(404).json({ message: 'Recipient not found' });
    }

  } catch (error) {
    console.error('Error in profile route:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

// Upload Profile Picture for Recipient
export const uploadProfilePic = (req, res) => {
  upload(req, res, async (err) => {

    const recipientId = req.recipientId;  // Assuming recipientId is extracted from authentication middleware
    try {
      // Save the uploaded image path to the recipient's profile in the database
      const updatedRecipient = await Recipient.findByIdAndUpdate(
        recipientId,
        { image: `/uploads/${req.file.filename}` },  // Save the file path in DB (image field)
        { new: true }
      );

      if (!updatedRecipient) {
        return res.status(404).json({ message: 'Recipient not found' });
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

// Delete Recipient Account
export const deleteAccount = async (req, res) => {
  try {
    const recipientId = req.recipientId;  // This will now be set by the authenticateRecipient middleware

    const recipient = await Recipient.findByIdAndDelete(recipientId);

    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    return res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Profile for Recipient
export const updateProfile = async (req, res) => {

try {
  const recipientId = req.recipientId;  // Extract recipientId from the authentication middleware
  const { location, bloodGroup } = req.body;  // Extract location and bloodGroup from the request body
  
  // Prepare the data to be updated
  const updateData = {};
  if (location) {
    updateData.location = location;
  }
  if (bloodGroup && !req.recipient.bloodGroup) {
    updateData.bloodGroup = bloodGroup; // Allow update only if bloodGroup is empty
  }

  // Find and update the recipient profile in the database
  const updatedRecipient = await Recipient.findByIdAndUpdate(recipientId, updateData, { new: true });

  if (!updatedRecipient) {
    return res.status(404).json({ message: 'Recipient not found' });
  }

  // Return the updated recipient data in the response
  return res.status(200).json({
    message: 'Profile updated successfully',
    recipient: updatedRecipient,
  });
} catch (error) {
  console.error('Error updating profile:', error);
  return res.status(500).json({ message: 'Internal server error' });
}
};

// Controller function to get all recipients
export const getRecipients = async (req, res) => {
  try {
    const recipients = await Recipient.find(); // Fetch all recipients from the database
    res.status(200).json(recipients); // Send the recipient data as JSON
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipients", error: error.message });
  }
}

// Controller function to delete a recipient
export const deleteRecipient = async (req, res) => {
  const recipientId = req.params.id; // Get the recipient ID from the URL parameter
  try {
    const recipient = await Recipient.findByIdAndDelete(recipientId); // Find and delete recipient by ID
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    res.status(200).json({ message: 'Recipient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipient', error: error.message });
  }
};