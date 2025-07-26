import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/RecipientManagement.css'; // Add your styles here

const RecipientManagement = () => {
  const [recipients, setRecipients] = useState([]); // Changed 'donors' to 'recipients'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all recipients when the component loads
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipients');
        setRecipients(response.data); // Changed 'donors' to 'recipients'
      } catch (error) {
        setError('Error fetching recipient data: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchRecipients();
  }, []);

  // Handle deleting a recipient
  const handleDelete = async (recipientId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this recipient?');
      if (!confirmDelete) return;

      // Send the DELETE request to the server with the recipient's ID
      await axios.delete(`http://localhost:5000/api/recipients/${recipientId}`);
      
      // Update the state to remove the deleted recipient from the list
      setRecipients(recipients.filter(recipient => recipient._id !== recipientId)); // Changed 'donors' to 'recipients'
      alert('Recipient deleted successfully!');
    } catch (error) {
      setError('Error deleting recipient: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="recipient-management-container"> {/* Changed class name */}
      <h2>Manage Recipients</h2> {/* Changed title from Donors to Recipients */}

      {error && <p className="error">{error}</p>}

      <div className="recipients-list"> {/* Changed class name */}
        {recipients.length === 0 ? ( // Changed 'donors' to 'recipients'
          <p>No recipients available</p>
        ) : (
          recipients.map((recipient) => ( // Changed 'donor' to 'recipient'
            <div key={recipient._id} className="recipient-card"> {/* Changed class name */}
              <h3>{recipient.name}</h3> {/* Changed 'donor' to 'recipient' */}
              <p><strong>Email:</strong> {recipient.email}</p>
              <p><strong>Phone:</strong> {recipient.phone}</p>
              <p><strong>Blood Type:</strong> {recipient.bloodType}</p>
              <button onClick={() => handleDelete(recipient._id)}>Delete</button> {/* Changed 'donor' to 'recipient' */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipientManagement;
