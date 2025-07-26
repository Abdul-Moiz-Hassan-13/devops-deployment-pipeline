import mongoose from 'mongoose';  // Import mongoose

// Define the BloodReceivingCamp schema
const bloodReceivingCampSchema = new mongoose.Schema({
  campName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  timing: { type: String, required: true },
  website: { type: String, required: true },
});

// Export the model as default
export default mongoose.model('BloodReceivingCamp', bloodReceivingCampSchema);
