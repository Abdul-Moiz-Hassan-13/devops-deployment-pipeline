const mongoose = require('mongoose');

// Define the schema for the user
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  googleId: { type: String, unique: true },
  avatar: String, // Optional: If you want to save the user's Google profile picture
});

const User = mongoose.model('User', userSchema);

module.exports = User;
