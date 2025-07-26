import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ViewRequests.css';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blood-requests/all');
        setRequests(response.data);
      } catch (err) {
        setError('Failed to fetch blood requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const acceptRequest = async (requestId) => {
    try {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token, show an alert or handle the error
        alert('Token is missing. Please login again.');
        return;
      }
  
      console.log('Request ID:', requestId); // Console log the request ID
  
      // Make the request with the JWT token in the Authorization header
      const response = await axios.post(
        `http://localhost:5000/api/accept-request/accept/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
  
      // Show success message if the request was accepted
      alert(response.data.message);
  
      // Update the state to remove the accepted request from the list
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (err) {
      // Handle error if the request fails (e.g., token issues, network errors)
      console.error('Error accepting request:', err.response?.data || err.message);
      alert('Error accepting request');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="view-requests-container">
      <h2 id="reqHeading">View Blood Requests</h2>

      {requests.length === 0 ? (
        <p>No blood requests available at the moment.</p>
      ) : (
        <div className="requests-list">
          {requests.map((request) => (
            <div key={request._id} className="request-card">
              <h3>{request.name}</h3>
              <p><strong>Blood Type:</strong> {request.bloodType}</p>
              <p><strong>Required Liters:</strong> {request.bloodLitersRequired}</p>
              <p><strong>Age:</strong> {request.age}</p>
              <p><strong>Gender:</strong> {request.gender}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <p><strong>Receive Blood at Doorstep:</strong> {request.receiveBloodAtDoorstep}</p>
              <p><strong>Contact:</strong> {request.phoneNumber}</p>

              <button onClick={() => acceptRequest(request._id)}>Accept Request</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewRequests;
