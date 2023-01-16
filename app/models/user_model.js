const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobileno: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  uploadImage: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  hobby: {
    type: Array,
    required: true,
  },
});



module.exports = new mongoose.model('Register',userSchema,'Register');