// src/components/Chatbot/ChatInput.js
import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [inputText, setInputText] = useState('');

  const handleChange = (e) => setInputText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSend(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form">
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Ask me something..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;