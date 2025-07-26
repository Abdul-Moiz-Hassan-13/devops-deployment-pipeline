// src/components/Chatbot/Chatbot.js
import '../styles/Chatbot.css';  // Import the CSS for styling
import React, { useState } from 'react';
import ChatMessage from './ChatMessage.js';
import ChatInput from './ChatInput.js';
import { generateContentWithGemini } from '../services/ChatService.js';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  // Function to handle sending messages
  const handleSendMessage = async (message) => {
    // Add user's message to the chat
    const newMessages = [...messages, { text: message, sender: 'You' }];
    setMessages(newMessages);

    // Call the Gemini API to get the bot's response
    const botResponse = await generateContentWithGemini(message);

    // Add bot's response to the chat
    setMessages([...newMessages, { text: botResponse, sender: 'Bot' }]);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">Chat Bot</div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default Chatbot;