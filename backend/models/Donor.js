import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bloodType: {
    type: String,
    required: true
  },
  location: {
    type: String,  // Type can be String, but you could also use a more complex type if needed
    required: false, // Optional location field
    default: '' // Default value can be empty string
  },
  image: {
    type: String,  // Image will be stored as a string (URL or base64)
    required: false, // Optional field
    default: '' // Default empty string (or can be null if you prefer)
  },
  donationHistory: [{
    donationDate: {
      type: Date,
      required: true
    },
    bloodType: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: 'successful' // Default status for donations
    }
  }],
});

export default mongoose.model('Donor', donorSchema);  // default export
