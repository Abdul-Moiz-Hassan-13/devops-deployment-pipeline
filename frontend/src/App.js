// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserTypeSelection from './components/UserTypeSelection.js';  // User type selection page
import DonorDashboard from './components/DonorDashboard.js';  // Donor dashboard component
import Login from './components/Login.js';  // Generic login component
import Register from './components/Register.js';  // Register component
import Profile from './components/Profile.js';  // Profile component
import Chatbot from './components/Chatbot.js';  // Chatbot component
import DonationHistory from './components/DonationHistory.js';  // Donation history component
import RecipientDashboard from './components/RecipientDashboard.js';  // Recipient dashboard component
import Achievements from './components/Achievements.js';  // Achievements component
import SendRequest from './components/SendRequest.js';  // Send request component
import BloodCamps from './components/BloodCamps.js';  // Blood camps component
import Workshops from './components/Workshops.js';  // Workshops component
import ViewRequests from './components/ViewRequests.js';  // View requests made by recipient
import ViewDonors from './components/ViewDonors.js';  // View donors who accepted recipient's requests
import SecretKeyPrompt from './components/SecretKeyPrompt.js';  // Import the SecretKeyPrompt component
import AdminDashboard from './components/AdminDashboard.js';  // Import the SecretKeyPrompt component
import DonorManagement from './components/DonorManagement.js';
import RecipientManagement from './components/RecipientManagement.js';
import ManageRequests from './components/ManageRequests.js'; // Import the Manage Requests component
import ManageBloodCamps from './components/ManageBloodCamps.js';  // Import the new component
import ManageWorkshops from './components/ManageWorkshops.js';  // Import the ManageWorkshops component

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for selecting user type */}
        <Route path="/" element={<UserTypeSelection />} />
        
        {/* Routes for Donor, Recipient, and Admin login */}
        <Route path="/login/donor" element={<Login role="donor" />} />
        <Route path="/login/recipient" element={<Login role="recipient" />} />
        <Route path="/login/admin" element={<Login role="admin" />} />
        
        {/* Donor and Recipient dashboards */}
        <Route path="/dashboard/donor" element={<DonorDashboard role="donor" />} />
        <Route path="/dashboard/recipient" element={<RecipientDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        
        {/* Profile and Chatbot Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/chatbot" element={<Chatbot />} />
        
        {/* Donation History Route */}
        <Route path="/donation-history/:donorEmail" element={<DonationHistory />} />
        
        {/* Register routes for donors and recipients */}
        <Route path="/register/donor" element={<Register role="donor" />} />
        <Route path="/register/recipient" element={<Register role="recipient" />} />
        
        {/* Routes for requests and camps */}
        <Route path="/blood-request" element={<SendRequest />} />
        <Route path="/blood-camps" element={<BloodCamps />} />
        <Route path="/workshops" element={<Workshops />} />
        
        {/* Route for viewing donors who accepted the recipient's requests */}
        <Route path="/recipients/donors" element={<ViewDonors />} /> 
        
        {/* Route for viewing requests made by the recipient */}
        <Route path="/view-requests" element={<ViewRequests />} />
        
        {/* Route for viewing achievements */}
        <Route path="/achievements" element={<Achievements />} />

        <Route path="/admin/enter-secret-key" element={<SecretKeyPrompt />} />
        <Route path="/admin/manage-donors" element={<DonorManagement />} />
        <Route path="/admin/manage-recipients" element={<RecipientManagement />} />

        <Route path="/admin/manage-blood-requests" element={<ManageRequests />} />
        <Route path="/admin/manage-blood-camps" element={<ManageBloodCamps />} />
        <Route path="/admin/manage-workshops" element={<ManageWorkshops />} />

      </Routes>
    </Router>
  );
}

export default App;
