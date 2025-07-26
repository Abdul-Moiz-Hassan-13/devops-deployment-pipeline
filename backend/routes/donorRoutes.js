import express from 'express';  // Use import syntax for express
import multer from 'multer';    // Use import syntax for multer
import { loginDonor, registerDonor, getDashboard, getProfile, uploadProfilePic, deleteAccount, updateProfile, getDonors, deleteDonor } from '../controllers/donorController.js'; // Correct named imports
import { authenticateDonor } from '../middleware/auth.js';  // Named import for authenticateDonor

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

// Routes
router.post('/login', loginDonor);  // Regular login
router.post('/register', registerDonor);  // Register route
router.get('/dashboard', authenticateDonor, getDashboard);  // Dashboard route with authentication
router.get('/profile', authenticateDonor, getProfile);  // Profile route with authentication

// Protect profile-pic route and ensure proper file upload
router.put('/profile-pic', authenticateDonor, upload.single('profilePic'), uploadProfilePic);

// Protect delete-account route
router.delete('/delete-account', authenticateDonor, deleteAccount);

// Protect update-profile route
router.put('/update-profile', authenticateDonor, updateProfile);

router.get("/", getDonors); // Will call the getDonors function in the controller
router.delete('/:id', deleteDonor);

// Export router as default export
export default router;
