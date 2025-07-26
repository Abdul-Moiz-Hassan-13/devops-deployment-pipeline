import mongoose from 'mongoose';

// Define the schema for workshops
const workshopSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  topic: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true }
});

// Create the Workshop model using the schema
const Workshop = mongoose.model('Workshop', workshopSchema);

export default Workshop;
