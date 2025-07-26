import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';  // Import custom styles for card layout

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType'); // Get the user type from localStorage

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log the userType from the outer scope (before the request)
    console.log(userType);  // Logs the userType from the outer scope

    // Based on userType, send different requests
    const url = userType === 'donor' 
      ? 'http://localhost:5000/api/donors/login'  // Donor login endpoint
      : 'http://localhost:5000/api/recipients/login';  // Recipient login endpoint

    try {
      const response = await axios.post(url, credentials);
      localStorage.setItem('token', response.data.token);  // Store JWT token
      // Store the userType from the backend response in localStorage
      const backendUserType = userType;  // Assuming backend sends userType
      localStorage.setItem('userType', backendUserType);  // Store user type in localStorage

      alert('Login Successful');

      // Navigate to the appropriate dashboard based on the user type
      if (backendUserType === 'donor') {
        console.log(backendUserType);  // Logs the userType from the backend response
        navigate('/dashboard/donor');
      } else if (backendUserType === 'recipient') {
        navigate('/dashboard/recipient');
      } else {
        console.log('Unexpected user type:', backendUserType);
      }
    } catch (error) {
      setError('Error: ' + error.response?.data?.message || error.message);  // Better error handling
    }
  };

  // Use useEffect to redirect if no userType is found
  useEffect(() => {
    if (!userType) {
      navigate('/'); // Redirect to UserTypeSelection if no userType is stored
    }
  }, [navigate, userType]);

  return (
    <div className="login-container">
      <div className="card">
        {/* Conditionally display heading based on userType */}
        <h2>{userType === 'donor' ? 'Donor Login' : 'Recipient Login'}</h2>

        {error && <p className="error">{error}</p>} {/* Display error message */}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>

        {/* Register Button to navigate to Register page */}
        <div className="register-link">
          <button
            onClick={() => navigate(`/register/${userType}`)}  // Dynamically navigate to the correct register page
            className="register-button"
          >
            Don't have an account? Register here
          </button>
        </div>

        <div className="separator">OR</div>

        {/* Google Sign-In Button */}
        <button className="google-login">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
