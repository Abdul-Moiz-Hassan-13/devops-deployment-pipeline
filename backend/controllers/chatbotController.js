// backend/controllers/chatbotController.js
import axios from 'axios';

export const chatWithBot = async (req, res) => {  // Use "export" with named function
  const { message } = req.body;
  
  // Gemini API integration
  const geminiApiKey = '';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

  const requestBody = {
    contents: [{ parts: { text: message } }],
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return res.json({ reply: response.data.candidates[0].content.parts[0].text });
    } else {
      return res.json({ reply: 'Sorry, I could not generate a response.' });
    }
  } catch (error) {
    console.error('Error with Gemini API:', error);
    return res.status(500).json({ error: 'Failed to communicate with the chatbot API.' });
  }
};
