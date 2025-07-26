import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for routing
import '../styles/Register.css'; // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bloodType: '', // Blood type is needed for donors, can be optional for recipients
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const [userType, setUserType] = useState(''); // State to hold the user type (donor or recipient)

  // Effect hook to set userType from localStorage
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    } else {
      navigate('/'); // If no user type is found, redirect to the UserTypeSelection page
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let endpoint = '';
      if (userType === 'donor') {
        endpoint = 'http://localhost:5000/api/donors/register';
      } else if (userType === 'recipient') {
        endpoint = 'http://localhost:5000/api/recipients/register';
      }

      await axios.post(endpoint, formData);  // Send registration request to the correct endpoint
      alert('Registration Successful');
      navigate(`/login/${userType}`);  // Redirect to the appropriate login page after successful registration
    } catch (error) {
      setError('Error: ' + error.response.data.message);  // Display error message if any
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register as {userType === 'donor' ? 'Donor' : 'Recipient'}</h2>

        {error && <p className="error-message">{error}</p>} {/* Display error message if any */}

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          
          {/* Display bloodType dropdown for both donors and recipients */}
          <select
            name="bloodType"
            onChange={handleChange}
            value={formData.bloodType}
            required  // Make bloodType required for both donor and recipient
          >
            <option value="">Choose Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>


          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
