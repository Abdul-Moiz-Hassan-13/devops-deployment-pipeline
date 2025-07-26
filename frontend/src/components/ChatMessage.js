// src/components/Chatbot/ChatMessage.js
const ChatMessage = ({ text, sender }) => {
    return (
      <div className={`chat-message ${sender === 'You' ? 'user' : 'bot'}`}>
        <p>{text}</p>
      </div>
    );
  };
  
  export default ChatMessage;