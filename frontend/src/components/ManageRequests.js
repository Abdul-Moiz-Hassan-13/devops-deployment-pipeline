// src/components/ManageRequests.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ManageRequests.css';  // Import the CSS for styling

const ManageRequests = () => {
  const [requests, setRequests] = useState([]); // State to hold blood requests
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  // Fetch all blood requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/requests');
        setRequests(response.data); // Set the requests data from the API
      } catch (error) {
        setError('Error fetching requests: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchRequests();
  }, []);

  // Handle delete request
  const handleDelete = async (requestId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this request?');
      if (!confirmDelete) return;

      // Send the DELETE request to the server with the request's ID
      await axios.delete(`http://localhost:5000/api/requests/${requestId}`);
      
      // Remove the deleted request from the state
      setRequests(requests.filter(request => request._id !== requestId));
      alert('Request deleted successfully!');
    } catch (error) {
      setError('Error deleting request: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="request-management-container">
      <h2>Manage Blood Requests</h2>

      {error && <p className="error">{error}</p>}

      <div className="requests-list">
        {requests.length === 0 ? (
          <p>No blood requests available.</p>
        ) : (
          requests.map((request) => (
            <div key={request._id} className="request-card">
              <h3>{request.name}</h3>
              <p><strong>Email:</strong> {request.email}</p>
              <p><strong>Phone:</strong> {request.phoneNumber}</p>
              <p><strong>Blood Type:</strong> {request.bloodType}</p>
              <p><strong>Blood Liters Required:</strong> {request.bloodLitersRequired}</p>
              <p><strong>Receive Blood at Doorstep:</strong> {request.receiveBloodAtDoorstep}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <button onClick={() => handleDelete(request._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageRequests;