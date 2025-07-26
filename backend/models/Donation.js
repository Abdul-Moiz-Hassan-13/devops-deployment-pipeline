// backend/models/Donation.js
import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  donationDate: { type: Date, default: Date.now },
  bloodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: 'successful' }, // Donation status (default is successful)
});

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;