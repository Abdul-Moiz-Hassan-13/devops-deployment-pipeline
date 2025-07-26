import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SecretKeyPrompt.css';  // Import the updated CSS

const SecretKeyPrompt = () => {
  const [key, setKey] = useState('');  // State to store the input key
  const [error, setError] = useState('');  // State for error message
  const navigate = useNavigate();  // To programmatically navigate to the dashboard

  const correctKey = '12345';  // This is the secret key to unlock the dashboard (you can change this)

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (key === correctKey) {
      // Redirect to the admin dashboard if the key is correct
      navigate('/dashboard/admin'); // Assuming this is the dashboard route
    } else {
      // Show an error if the key is incorrect
      setError('Incorrect key! Please try again.');
    }
  };

  return (
    <div className="secret-key-prompt">
      <h5>Enter Secret Key</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder=""
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SecretKeyPrompt;
