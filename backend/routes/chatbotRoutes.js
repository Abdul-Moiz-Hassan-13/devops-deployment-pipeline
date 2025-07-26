// backend/routes/chatbotRoutes.js
import express from 'express';
import { chatWithBot } from '../controllers/chatbotController.js'; // Named import for controller

const router = express.Router();

// Route to handle chatbot communication
router.post('/chat', chatWithBot);

export default router;  // Ensure this is a default export
