// src/components/ManageBloodCamps.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ManageBloodCamps.css';  // Import the CSS for styling

const ManageBloodCamps = () => {
  const [bloodCamps, setBloodCamps] = useState([]); // State to hold blood camps
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  // Fetch all blood camps on component mount
  useEffect(() => {
    const fetchBloodCamps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blood-camps');
        setBloodCamps(response.data); // Set the blood camps data from the API
      } catch (error) {
        setError('Error fetching blood camps: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchBloodCamps();
  }, []);

  // Handle delete blood camp
  const handleDelete = async (campId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this blood camp?');
      if (!confirmDelete) return;

      // Send the DELETE request to the server with the camp's ID
      await axios.delete(`http://localhost:5000/api/blood-camps/${campId}`);
      
      // Remove the deleted camp from the state
      setBloodCamps(bloodCamps.filter(camp => camp._id !== campId));
      alert('Blood camp deleted successfully!');
    } catch (error) {
      setError('Error deleting blood camp: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="blood-camp-management-container">
      <h2>Manage Blood Camps</h2>

      {error && <p className="error">{error}</p>}

      <div className="blood-camps-list">
        {bloodCamps.length === 0 ? (
          <p>No blood camps available.</p>
        ) : (
          bloodCamps.map((camp) => (
            <div key={camp._id} className="blood-camp-card">
              <h3>{camp.campName}</h3>
              <p><strong>Address:</strong> {camp.address}</p>
              <p><strong>Phone:</strong> {camp.phoneNumber}</p>
              <p><strong>Timing:</strong> {camp.timing}</p>
              <p><strong>Website:</strong> <a href={camp.website} target="_blank" rel="noopener noreferrer">{camp.website}</a></p>
              <button onClick={() => handleDelete(camp._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageBloodCamps;