export const sendBloodRequest = async (data) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found, please log in.');
  }

  try {
    // Make the POST request to the backend
    const response = await fetch('http://localhost:5000/api/blood-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(data),
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error sending blood request');
    }

    return await response.json();  // Return the response in JSON format
  } catch (error) {
    console.error('Error sending blood request:', error);
    throw error; // Re-throw the error for handling by the caller
  }
};
