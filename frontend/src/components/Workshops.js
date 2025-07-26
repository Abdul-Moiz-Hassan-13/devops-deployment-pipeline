import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import '../styles/Workshops.css';  // Import the CSS for styling

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  // Fetch workshops data when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/workshops')  // Replace with your backend URL if needed
      .then(response => {
        setWorkshops(response.data);  // Set the workshops data to the state
      })
      .catch(error => {
        console.error('Error fetching workshops data:', error);
      });
  }, []);

  const mapStyles = {
    height: '360px', // Adjust height of the map
    width: '100%',

  };

  const mapCenter = {
    lat: 33.6844, // Latitude for Islamabad
    lng: 73.0479, // Longitude for Islamabad
  };

  const handleMarkerClick = (workshop) => {
    setSelectedWorkshop(workshop);
  };

  return (
    <div className="workshops-container">
      <h1 className="workshops-heading">Workshops</h1>

      <div className="workshops-cards">
        {workshops.map((workshop) => (
          <div className="workshop-card" key={workshop._id}>
            <h3>{workshop.eventName}</h3>
            <p><strong>Date:</strong> {new Date(workshop.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {workshop.time}</p>
            <p><strong>Location:</strong> {workshop.location}</p>
            <p><strong>Duration:</strong> {workshop.duration}</p>
            <p><strong>Topic:</strong> {workshop.topic}</p>
            <p><strong>Contact:</strong> {workshop.phoneNumber}</p>
            <p><strong>Email:</strong> {workshop.email}</p>

            {/* Google Maps will be displayed in this div */}
            <div style={{ marginTop: '20px' }}>
              <LoadScript googleMapsApiKey="">
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  center={mapCenter}
                  zoom={12}
                >
                  {/* Markers for workshops */}
                  <Marker
                    position={{ lat: workshop.lat, lng: workshop.lng }}
                    onClick={() => handleMarkerClick(workshop)}
                  />

                  {selectedWorkshop && selectedWorkshop._id === workshop._id && (
                    <InfoWindow
                      position={{ lat: workshop.lat, lng: workshop.lng }}
                      onCloseClick={() => setSelectedWorkshop(null)}
                    >
                      <div>
                        <h4>{selectedWorkshop.eventName}</h4>
                        <p>{selectedWorkshop.location}</p>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workshops;