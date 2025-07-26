// src/services/chatbotService.js
export const generateContentWithGemini = async (userInput) => {
    const geminiApiKey = '';  // Replace with your actual Gemini API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;
    
    const requestBody = {
      contents: [{ parts: { text: userInput } }],
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
        throw new Error('Error fetching chatbot response');
      }
  
      const data = await response.json();
      console.log("Full Response from API: ", data);  // Log the entire response for debugging
  
      // Access the correct property for the chatbot's output
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return "I'm sorry, I don't have an answer for that.";
      }
    } catch (error) {
      console.error('Request failed', error);
      return "There was an error connecting to the chatbot.";
    }
  };