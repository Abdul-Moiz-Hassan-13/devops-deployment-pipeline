import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ManageWorkshops.css'; // Import the CSS file for styling

const ManageWorkshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all workshops when the component loads
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/workshops');
        setWorkshops(response.data);
      } catch (error) {
        setError('Error fetching workshop data: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchWorkshops();
  }, []);

  // Handle deleting a workshop
  const handleDelete = async (workshopId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this workshop?');
      if (!confirmDelete) return;

      // Send the DELETE request to the server with the workshop's ID
      await axios.delete(`http://localhost:5000/api/workshops/${workshopId}`);

      // Update the state to remove the deleted workshop from the list
      setWorkshops(workshops.filter(workshop => workshop._id !== workshopId));
      alert('Workshop deleted successfully!');
    } catch (error) {
      setError('Error deleting workshop: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="workshop-management-container">
      <h2>Manage Workshops</h2>

      {error && <p className="error">{error}</p>}

      <div className="workshops-list">
        {workshops.length === 0 ? (
          <p>No workshops available</p>
        ) : (
          workshops.map((workshop) => (
            <div key={workshop._id} className="workshop-card">
              <h3>{workshop.eventName}</h3>
              <p><strong>Date:</strong> {new Date(workshop.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {workshop.time}</p>
              <p><strong>Location:</strong> {workshop.location}</p>
              <p><strong>Topic:</strong> {workshop.topic}</p>
              <p><strong>Phone:</strong> {workshop.phoneNumber}</p>
              <p><strong>Email:</strong> {workshop.email}</p>
              <button onClick={() => handleDelete(workshop._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageWorkshops;