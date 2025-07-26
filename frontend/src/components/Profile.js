import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css'; // Import custom CSS for styling

const ProfilePage = () => {
  const [user, setUser] = useState(null);  // Store user data in state
  const [error, setError] = useState('');  // Store error messages
  const [image, setImage] = useState(null);  // Store selected image
  const [showModal, setShowModal] = useState(false);  // Control modal visibility
  const [newLocation, setNewLocation] = useState('');  // New location input
  const [newBloodGroup, setNewBloodGroup] = useState('');  // New blood group input
  const navigate = useNavigate();  // Navigate programmatically

  // Fetch user profile data from the server or localStorage on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
        }

        // Retrieve user type from localStorage
        const userType = localStorage.getItem('userType');
        if (!userType) {
          navigate('/');
        }

        // Determine the profile URL based on user type (donor or recipient)
        const profileUrl = userType === 'donor'
          ? 'http://localhost:5000/api/donors/profile'
          : 'http://localhost:5000/api/recipients/profile';

        // Fetch profile data from the server
        const response = await axios.get(profileUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Set user data in state and localStorage for persistence across page reload
        const fetchedUser = response.data.user;
        setUser(fetchedUser);
        localStorage.setItem('user', JSON.stringify(fetchedUser));  // Store in localStorage

      } catch (error) {
        setError('Error fetching profile data: ' + (error.response?.data?.error || error.message));
      }
    };

    fetchProfileData();
  }, [navigate]);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);  // Update image state with the selected file
    }
  };

  // Upload profile picture to the server
  const handleImageUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', image);  // Ensure this matches the field name in the backend

    try {
      const token = localStorage.getItem('token');
      const userType = localStorage.getItem('userType');
      
      // Update profile picture for the appropriate user type (donor/recipient)
      const uploadUrl = userType === 'donor'
        ? 'http://localhost:5000/api/donors/profile-pic'
        : 'http://localhost:5000/api/recipients/profile-pic';

      const response = await axios.put(uploadUrl, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Profile picture updated:', response.data);

      // After uploading, update the user data with the new image URL
      setUser(prevUser => {
        const updatedUser = { ...prevUser, image: response.data.image };
        localStorage.setItem('user', JSON.stringify(updatedUser));  // Persist updated user data
        return updatedUser;
      });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Error uploading profile picture');
    }
  };

  // Handle profile changes (location, blood group)
  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to update your profile.');
      return;
    }

    const userType = localStorage.getItem('userType');
    if (!userType) {
      alert('No user type found in localStorage. Please log in again.');
      return;
    }

    try {
      const updatedUserData = {};

      // Add location and blood group to the update object if they are provided
      if (newLocation) updatedUserData.location = newLocation;
      if (newBloodGroup && !user.bloodGroup) updatedUserData.bloodGroup = newBloodGroup;

      if (Object.keys(updatedUserData).length === 0) {
        alert('No changes to save');
        return;
      }

      console.log('Updated User Data:', updatedUserData); // Log the data before sending to server

      // Define the profile update URL based on user type
      const profileUpdateUrl = userType === 'donor'
        ? 'http://localhost:5000/api/donors/update-profile'
        : 'http://localhost:5000/api/recipients/update-profile';

      // Send the update request to the server
      const response = await axios.put(profileUpdateUrl, updatedUserData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the user state with the response data
      setUser(prevUser => {
        const updatedUser = { ...prevUser, ...response.data.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));  // Persist updated user data
        return updatedUser;
      });

      setShowModal(false);  // Close the modal after saving changes
    } catch (error) {
      console.error('Error saving profile changes:', error);
      setError('Failed to save changes');
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('userType');
        
        const deleteUrl = userType === 'donor'
          ? 'http://localhost:5000/api/donors/delete-account'
          : 'http://localhost:5000/api/recipients/delete-account';

        const response = await axios.delete(deleteUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert(response.data.message);
        localStorage.removeItem('token');

        // Retrieve user type from loc

        if (userType === 'donor') {
          navigate('/register/donor');  // Redirect to donor registration or login page
        } 
        
        else if (userType === 'recipient') {
          navigate('/register/recipient');  // Redirect to recipient registration or login page
        }

      } 

      catch (error) {
        console.error("Error deleting account:", error);
      setError("Error deleting account.");
      
    }
    
  }
  
};

  return (
    <div className="profile-container">
      <h1 className="profile-header">Profile</h1>

      {error && <p className="error">{error}</p>} {/* Display error message */}

      {user ? (
        <div className="profile-card">
          <div className="profile-image-container">
            {console.log('User profilePic:', user.image)}

            <img
              src={user.image ? `http://localhost:5000${user.image}` : '/assets/placeholder.jpeg'}
              alt="Profile"
              className="profile-image"
            />
            <div className="upload-button">
              <input type="file" onChange={handleImageChange} />
              <button onClick={handleImageUpload}>Upload Image</button>
            </div>
          </div>

          <div className="profile-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Blood Group:</strong> {user.bloodGroup || 'Not Provided'}</p>
            <p><strong>Location:</strong> {user.location || 'Not Provided'}</p>

            <button className="edit-profile-button" onClick={() => setShowModal(true)}>
              Edit Profile
            </button>

            <button className="delete-account-button" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Modal for editing location and blood group */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Profile</h2>

            {/* Location Input */}
            <div className="modal-field">
              <label>Location:</label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder={user.location || 'Enter your location'}
              />
            </div>

            {/* Blood Group Dropdown */}
            <div className="modal-field">
              <label>Blood Group:</label>
              <select
                value={newBloodGroup} // Default to current user's blood group or empty if not available
                onChange={(e) => setNewBloodGroup(e.target.value)}
                disabled={user.bloodGroup}  // Disable dropdown if the user already has a blood group
              >
                <option value="">Choose Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Modal Actions */}
            <div className="modal-actions">
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
