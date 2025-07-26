import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/DonorDashboard.css'; // Import the styles

const DonorDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/'); // Redirect to login if no token
        }

        const response = await axios.get('http://localhost:5000/api/donors/dashboard', {
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
        <h1>Donor Dashboard</h1>
        <div className="nav-buttons">
          <button onClick={() => navigate('/profile')}>Profile</button>
          <button onClick={() => navigate('/chatbot')}>Chatbot</button>
          <button onClick={() => navigate('/view-requests')}>View Requests</button> {/* Navigate to View Requests page */}
          <button onClick={() => navigate('/achievements')}>Achievements and Benefits</button>
          <button onClick={() => navigate(`/blood-camps`)}>Blood Donation camps</button>  
          <button onClick={() => navigate(`/workshops`)}>Workshops</button>  {/* Navigate to workshops page */}
          <button onClick={() => navigate(`/donation-history/${user?.email}`)}>History</button> {/* Link to History Page */}        </div>
      </nav>

      {error && <p className="error">{error}</p>} {/* Display error message */}
      {user ? (
        <div className="dashboard-card">
          <h2>Welcome, {user.name}</h2>
          {/* Donor Image */}
          <img src="/assets/1.png" alt="Donor" className="main-image" />
          <p className="catchy-phrase">Your contribution can make a life-changing difference!</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DonorDashboard;