import mongoose from 'mongoose';

const recipientSchema = new mongoose.Schema({
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
  receptionHistory: [{
    receptionDate: {
      type: Date,
      required: true
    },
    bloodTypeReceived: {
      type: String,
      required: true
    },
    quantityReceived: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: 'successful' // Default status for transfusions
    }
  }],
  image: {
    type: String,  // The image URL or file path
    default: ' '  // Default image URL if not provided
  },
  location: {
    type: String,  // Location of the recipient
    default: 'Not provided'  // Default value if location is not provided
  }
});

// Use ES module export
export default mongoose.model('Recipient', recipientSchema);
