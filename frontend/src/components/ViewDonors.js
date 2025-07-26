import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ViewDonors.css'; // Import the styles for donors

const ViewDonors = () => {
  const [donors, setDonors] = useState([]); // State for the donors
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const navigate = useNavigate();

  useEffect(() => {
    
    // Function to fetch accepted donors
    const fetchAcceptedDonors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://backend-service/api/recipients/donors', {
          headers: { Authorization: `Bearer ${token}` },  // Send token as Authorization header
        });

        setDonors(response.data);  // Update the donors state with the response
      } catch (error) {
        setError('Error fetching donors: ' + (error.response?.data?.error || error.message)); // Handle error
      } finally {
        setLoading(false); // Stop loading when the request is finished
      }
    };

    fetchAcceptedDonors(); // Call the function to fetch donors
  }, [navigate]);  // Runs only when the component mounts

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="donors-container">
      <h2 id="donorHeading">Donors Who Accepted Your Request</h2>
  
      {/* If no donors found */}
      {donors.length === 0 ? (
        <p>No donors found for your requests.</p>
      ) : (
        <div className="donors-list">
          {/* Map through donors and display their details */}
          {donors.map((donor, index) => (
            <div key={index} className="donor-card">
              <h3>{donor.donorName}</h3> {/* Changed to donorName */}
              <p><strong>Name:</strong> {donor.donorName}</p> {/* Changed to donorPhoneNumber */}
              <p><strong>Email:</strong> {donor.donorEmail}</p> {/* Changed to donorEmail */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default ViewDonors;
