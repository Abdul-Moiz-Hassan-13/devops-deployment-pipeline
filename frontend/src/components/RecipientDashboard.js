import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/DonorDashboard.css';

const RecipientDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch the user info when the component loads
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token: ", token);
        
        if (!token) {
          navigate('/login'); // Redirect to login if no token
          return;
        }

        const response = await axios.get('http://localhost:5000/api/recipients/dashboard', {
          headers: { Authorization: `Bearer ${token}` }, // Send token as Authorization header
        });

        setUser(response.data.user); // Set the user data in state
      } catch (error) {
        setError('Error fetching dashboard data: ' + (error.response?.data?.error || error.message));
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1>Recipient Dashboard</h1>
        <div className="nav-buttons">
          <button onClick={() => navigate('/profile')}>Profile</button>
          <button onClick={() => navigate('/chatbot')}>Chatbot</button>
          <button onClick={() => navigate('/blood-request')}>Send Request</button>
          <button onClick={() => navigate('/recipients/donors')}>View Donors</button> {/* Button to view accepted donors */}
          <button onClick={() => navigate(`/blood-camps`)}>Blood Donation Camps</button>
          <button onClick={() => navigate(`/workshops`)}>Workshops</button>
        </div>
      </nav>

      {error && <p className="error">{error}</p>} {/* Display error message */}
      {user ? (
        <div className="dashboard-card">
          <h2>Welcome, {user.name}</h2>
          <img src="/assets/1.png" alt="Recipient" className="main-image" />
          <p className="catchy-phrase">Your healing journey begins with a single step.</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipientDashboard;
