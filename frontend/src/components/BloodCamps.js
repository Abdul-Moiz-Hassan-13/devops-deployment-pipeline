import React, { useState, useEffect } from 'react';
import '../styles/BloodCamps.css';  // Import the CSS file for styling

const BloodCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch blood receiving camps data from the backend
    const fetchCamps = async () => {
      try {
const response = await fetch('http://localhost:5000/api/camps');
        if (!response.ok) {
          throw new Error('Failed to fetch camps');
        }
        const data = await response.json();
        setCamps(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  if (loading) {
    return <div>Loading camps...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="donationCamps">Blood Donation Camps</h1>
      
      <div className="camps-container">
        {camps.length === 0 ? (
          <p>No blood camps available at the moment.</p>
        ) : (
          camps.map((camp) => (
            <div className="camp-card" key={camp._id}>
              <h3>{camp.campName}</h3>
              <p><strong>Address:</strong> {camp.address}</p>
              <p><strong>Phone Number:</strong> {camp.phoneNumber}</p>
              <p><strong>Timings:</strong> {camp.timing}</p>
              <p><strong>Website:</strong> <a href={camp.website} target="_blank" rel="noopener noreferrer">{camp.website}</a></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BloodCamps;
