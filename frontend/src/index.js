import React from 'react';
import ReactDOM from 'react-dom/client'; // Notice the change here
import './index.css';  // Optional: If you use CSS
import App from './App.js';  // Main App component

// Create a root for rendering in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
