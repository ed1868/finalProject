const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending Confirmation', 'Active'],
      default: 'Pending Confirmation',
    },
    password: {
      type: String,
      required: true,
    },
    imgName: String,
    url: {
      type:String,
      default:'../public/images/Medical-Logo.png',
    },
    name: String,
    dob: String,
    medicalLicenseNumber: {
      type: String,
      required: true,
    },
    gender:{
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    experience: Number,
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
      }
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);


const User = mongoose.model('User', userSchema);
module.exports = User;
