import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserTypeSelection.css'; // Correct import of the CSS file

const UserTypeSelection = () => {
  const navigate = useNavigate(); // Use navigate hook to programmatically navigate

  const handleSelection = (userType) => {
    localStorage.setItem('userType', userType);  // Store the selected user type in localStorage

    if (userType === 'donor') {
      navigate('/login/donor'); // Navigate to Donor Login
    } else if (userType === 'recipient') {
      navigate('/login/recipient'); // Navigate to Receiver Login
    } else if (userType === 'admin') {
      navigate('/admin/enter-secret-key'); // Navigate to Admin Secret Key Prompt
    }
  };

  return (
    <div className="user-type-selection-container">
      <h1>Blood Donation App</h1> {/* Add the title here */}
      <div className="card">
        <h2>Select Your Role</h2> {/* Subheading */}
        <div className="button-container">
          <button className="user-type-selection-button" onClick={() => handleSelection('donor')}>Donor</button>
          <button className="user-type-selection-button" onClick={() => handleSelection('recipient')}>Recipient</button>
          <button className="user-type-selection-button" onClick={() => handleSelection('admin')}>Admin</button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
