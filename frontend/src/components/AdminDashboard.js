import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminDashboard.css'; // You can reuse the same styles or create a new one

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1>Admin Dashboard</h1>
        <div className="nav-buttons">
       `  <button onClick={() => navigate('/chatbot')}>Chatbot</button>
          <button onClick={() => navigate('/admin/manage-donors')}>Manage Donors</button>
          <button onClick={() => navigate('/admin/manage-recipients')}>Manage Recipients</button>
          <button onClick={() => navigate('/admin/manage-blood-requests')}>Manage Requests</button>
          <button onClick={() => navigate('/admin/manage-blood-camps')}>Manage Blood Camps</button>
          <button onClick={() => navigate('/admin/manage-workshops')}>Manage Workshops</button>
        </div>
      </nav>

      <div className="dashboard-card">
          <h2>Welcome, Admin</h2>
          <img src="/assets/1.png" alt="Recipient" className="main-image" />
        </div>
    </div>
  );
};

export default AdminDashboard;
