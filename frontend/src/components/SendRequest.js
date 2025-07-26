import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendBloodRequest } from '../services/bloodRequestService.js'; // The function to interact with the backend
import '../styles/SendRequest.css';  // Import the updated CSS

const SendRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    phoneNumber: '',
    address: '',
    bloodLitersRequired: '',
    bloodType: '',
    receiveBloodAtDoorstep: '', // Add the new field to the state
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendBloodRequest(formData);
      setSuccess(true);
      setError('');
      // Optionally, you can redirect or clear the form after success.
    } catch (err) {
      setError('Error sending request. Please try again.');
    }
  };

  return (
    <div className="request-form-container">
      <h2>Blood Request Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Other form fields remain the same */}
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Phone Number:</label>
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

        <label>Address:</label>
        <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>

        <label>Blood Liters Required:</label>
        <input type="number" name="bloodLitersRequired" value={formData.bloodLitersRequired} onChange={handleChange} required />

        <label>Blood Type:</label>
        <select name="bloodType" value={formData.bloodType} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="A+">A+</option>
          <option value="O+">O+</option>
          <option value="B+">B+</option>
          <option value="AB+">AB+</option>
          <option value="A-">A-</option>
          <option value="O-">O-</option>
          <option value="B-">B-</option>
          <option value="AB-">AB-</option>
        </select>

        {/* New field for "Receive Blood at Doorstep" */}
        <label>Receive Blood at Doorstep:</label>
        <select name="receiveBloodAtDoorstep" value={formData.receiveBloodAtDoorstep} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">Request submitted successfully!</p>}

        <button type="submit">Send Request</button>
      </form>
    </div>
  );
}  

export default SendRequest;
