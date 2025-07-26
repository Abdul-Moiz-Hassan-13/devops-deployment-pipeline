import express from 'express';  // Import express
import { loginRecipient, registerRecipient, getDashboard, getProfile, uploadProfilePic, deleteAccount, updateProfile, getRecipients, deleteRecipient } from '../controllers/recipientController.js';
import multer from 'multer';  // Import multer for file uploads
import { authenticateRecipient } from '../middleware/auth.js';  // Use named import

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    const fileExtension = file.mimetype.split('/')[1];
    cb(null, Date.now() + '.' + fileExtension); // Unique filename for each image
  },
});
const upload = multer({ storage });

// Routes for Recipient
router.post('/login', loginRecipient); // Regular login for recipient
router.post('/register', registerRecipient); // Register route for recipient
router.get('/dashboard', authenticateRecipient, getDashboard); // Dashboard route with authentication
router.get('/profile', authenticateRecipient, getProfile); // Profile route with authentication

// Route for uploading profile picture
router.put('/profile-pic', authenticateRecipient, upload.single('profilePic'), uploadProfilePic);  // Protect profile-pic route

// Route for deleting recipient account
router.delete('/delete-account', authenticateRecipient, deleteAccount);  // Protect delete-account route

// Route for updating recipient profile
router.put('/update-profile', authenticateRecipient, updateProfile);

router.get("/", getRecipients); // Will call the getDonors function in the controller
router.delete('/:id', deleteRecipient);

// Export the router as default (ES module export)
export default router;
