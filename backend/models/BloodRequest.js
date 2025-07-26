import mongoose from 'mongoose';  // Import mongoose

const bloodRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  bloodLitersRequired: { type: Number, required: true },
  bloodType: { type: String, required: true },
  status: { type: String, default: 'Pending' },  // Default status as 'Pending'
  requestDate: { type: Date, default: Date.now },
  receiveBloodAtDoorstep: { type: String, enum: ['Yes', 'No'], required: true },  // New field
});

// Use default export for the BloodRequest model
export default mongoose.model('BloodRequest', bloodRequestSchema);

