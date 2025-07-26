import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/DonorManagement.css'; // Add your styles here

const DonorManagement = () => {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all donors when the component loads
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/donors');
        setDonors(response.data);
      } catch (error) {
        setError('Error fetching donor data: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchDonors();
  }, []);

  // Handle deleting a donor
  const handleDelete = async (donorId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this donor?');
      if (!confirmDelete) return;

      // Send the DELETE request to the server with the donor's ID
      await axios.delete(`http://localhost:5000/api/donors/${donorId}`);
      
      // Update the state to remove the deleted donor from the list
      setDonors(donors.filter(donor => donor._id !== donorId)); 
      alert('Donor deleted successfully!');
    } catch (error) {
      setError('Error deleting donor: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="donor-management-container">
      <h2>Manage Donors</h2>

      {error && <p className="error">{error}</p>}

      <div className="donors-list">
        {donors.length === 0 ? (
          <p>No donors available</p>
        ) : (
          donors.map((donor) => (
            <div key={donor._id} className="donor-card">
              <h3>{donor.name}</h3>
              <p><strong>Email:</strong> {donor.email}</p>
              <p><strong>Phone:</strong> {donor.phone}</p>
              <p><strong>Blood Type:</strong> {donor.bloodType}</p>
              <button onClick={() => handleDelete(donor._id)}>Delete</button> {/* Use the donor's _id */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DonorManagement;
