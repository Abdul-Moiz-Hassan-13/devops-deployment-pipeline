import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  recipientName: { type: String, required: true },
  recipientEmail: { type: String, required: true },
  recipientPhoneNumber: { type: String, required: true },
  recipientBloodType: { type: String, required: true },
  donorName: { type: String, required: true },
  donorEmail: { type: String, required: true },
  donorPhoneNumber: { type: String, required: false },
  bloodLiters: { type: Number, required: true },
  status: { type: String, default: 'Accepted' }, // You can track the request status here
  acceptedAt: { type: Date, default: Date.now },  // Timestamp when the request was accepted
});

const Request = mongoose.model('Request', requestSchema);

export default Request;
