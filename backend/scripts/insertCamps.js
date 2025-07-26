import mongoose from 'mongoose';
import Workshop from '../models/Workshop.js';  // Import the Workshop model

// Directly use the MongoDB URI
const MONGO_URI = '';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    insertSampleData();  // Insert sample data after connection is established
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Function to insert sample workshop data
const insertSampleData = async () => {
  try {
    // Sample workshop data
    const workshops = [
      {
        eventName: 'Blood Donation Workshop 1',
        date: new Date('2024-12-15'),
        time: '10:00 AM',
        location: 'Community Center, City',
        duration: '2 hours',
        topic: 'Importance of Blood Donation',
        phoneNumber: '123-456-7890',
        email: 'contact@bloodworkshop1.com'
      },
      {
        eventName: 'Blood Donation Workshop 2',
        date: new Date('2024-12-20'),
        time: '11:00 AM',
        location: 'Town Hall, City',
        duration: '3 hours',
        topic: 'How Blood Transfusion Saves Lives',
        phoneNumber: '098-765-4321',
        email: 'contact@bloodworkshop2.com'
      },
      {
        eventName: 'Blood Donation Workshop 3',
        date: new Date('2024-12-25'),
        time: '1:00 PM',
        location: 'City Library, City',
        duration: '1.5 hours',
        topic: 'Blood Donation Myths and Facts',
        phoneNumber: '555-123-4567',
        email: 'contact@bloodworkshop3.com'
      }
    ];

    // Insert the sample workshops into the database
    await Workshop.insertMany(workshops);
    console.log('Sample workshops inserted successfully');

    // Close the MongoDB connection after insertion
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting sample data:', error);
    mongoose.connection.close();
  }
};
