const mongoose = require('mongoose');
// models/user.js

const applicationSchema = new mongoose.Schema({
  // properties of applications
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  applications: [applicationSchema], // embedding the applicationSchema here
});

