import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DonationHistory.css';  // Import the updated CSS
import { useNavigate } from 'react-router-dom';  // Make sure to import useNavigate

const DonationHistory = () => {
  const { donorEmail } = useParams(); // Get donorEmail from the URL params
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();  // Initialize the navigate function

  // Fetch donation history for the given donor email
  useEffect(() => {
    const fetchDonationHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/donations/history/${donorEmail}`);

        // Check if the response is okay (status 200)
        if (!response.ok) {
          throw new Error(`Error fetching history: ${response.statusText}`);
        }

        const data = await response.json();
        setDonations(data);  // Set donation history to state
      } catch (err) {
        setError('Error fetching donation history: ' + err.message);
      } finally {
        setLoading(false); // Set loading state to false once data is fetched or error occurs
      }
    };

    fetchDonationHistory();
  }, [donorEmail]); // Re-run the effect if the donorEmail changes

  // Show loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there is an issue
  if (error) {
    return <div>{error}</div>;
  }

  // Show a message if there are no donations
  if (donations.length === 0) {
    return (
      <div className="no-donations-message">
        <h2 id="ndh">No donations found.</h2>
        <button onClick={() => navigate('/view-requests')}>Donate Now!</button> {/* Navigate to View Requests page */}
      </div>
    );
  }

  // Render donation history if data exists
  return (
    <div>
      <h2>Donation History</h2>
      <ul>
        {donations.map((donation) => (
          <li key={donation._id}> {/* We are not displaying the _id */}
            <h3>Donation Details</h3>
            <p className="card-date">{new Date(donation.donationDate).toLocaleDateString()}</p>
            <p>Blood Type: {donation.bloodType}</p>
            <p>Quantity: {donation.quantity} liters</p>
            <p>Status: <span className="card-status">{donation.status}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonationHistory;