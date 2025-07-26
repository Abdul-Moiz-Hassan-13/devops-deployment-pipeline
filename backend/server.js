import express from 'express';  // Import express
import cors from 'cors';  // Import cors for handling CORS
import mongoose from 'mongoose';  // Import mongoose for MongoDB connection
import dotenv from 'dotenv';  // Import dotenv for environment variables
import path from 'path';  // Import path for handling file and directory paths
import donorRoutes from './routes/donorRoutes.js';  // Default import of the routes
import chatbotRoutes from './routes/chatbotRoutes.js'; // Importing as default
import donationRoutes from './routes/donationRoutes.js';  // Import donationRoutes (with .js extension)
import recipientRoutes from './routes/recipientRoutes.js';  // Import using ES module default import
import achievementRoutes from './routes/achievementRoutes.js';  // Add .js extension
import bloodRequestRoutes from './routes/bloodRequestRoutes.js';  // Default import for blood request routes
import getbloodRequestRoutess from './routes/getbloodRequestsRoutes.js';  // Import the blood requests route
import campsRoutes from './routes/campsRoutes.js';  // Import the routes
import workshopRoutes from './routes/workshops.js';  // Import the workshops routes
import acceptRequestRoutes from './routes/acceptRequestRoutes.js';  // Import the new routes
import viewDonorRoutes from './routes/viewDonorRoutes.js';  // Import donor routes
import requestsRoutes from './routes/requestsRoutes.js'; // Import the requests routes
import bloodCampRoutes from './routes/manageCampsRoutes.js'; // Import the routes for blood camps
import manageworkshopRoutes from './routes/manageWorkshopRoutes.js'; // Import the routes for workshops
import axios from 'axios';  // Import axios for making API requests
import { fileURLToPath } from 'url';

// Initialize environment variables
dotenv.config();

// Create express app
const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);  // Get current file URL
const __dirname = path.dirname(__filename);         // Get the directory name of the current file

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors());
app.use(express.json());  // Body parsing for JSON requests

app.post('/api/chatbot', async (req, res) => {
  const { message } = req.body;

  const geminiApiKey = '';  // Your Gemini API Key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;
  
  const requestBody = {
    contents: [{ parts: { text: message } }],
  };

  try {
    // Send a POST request to Gemini API
    const response = await axios.post(url, requestBody, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Extract the response from Gemini
    const botResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";

    // Send the bot's response back to the client
    return res.json({ reply: botResponse });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    return res.status(500).json({ error: 'Failed to communicate with the chatbot API.' });
  }
});

// Routes
app.use('/api/donors', donorRoutes);
app.use('/api/recipients', recipientRoutes);
app.use('/api/chatbot', chatbotRoutes); // Existing chatbot routes
app.use('/api/donations', donationRoutes);  // Add donation routes here
app.use('/api', achievementRoutes);  // This will handle requests to /api/achievements
app.use('/api/blood-requests', bloodRequestRoutes);
app.use('/api/blood-requests', getbloodRequestRoutess);  // Mount the bloodRequestRoutes on the /api/blood-requests path
app.use('/api', campsRoutes);  // All routes will be prefixed with /api
app.use('/api', workshopRoutes); //workshop routes
// Add this line in your `server.js` under the existing route handlers
app.use('/api/accept-request', acceptRequestRoutes);  // Use the acceptRequestRoutes for accepting blood requests
app.use('/api', viewDonorRoutes);  // Use the newly created donorsRoutes for email-based query
app.use('/api', requestsRoutes); // Use '/api' prefix for all request routes
app.use('/api',bloodCampRoutes);
app.use('/api',manageworkshopRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log('MongoDB connection error:', err));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
