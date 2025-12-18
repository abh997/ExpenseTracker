const express = require("express");
const { default: mongoose } = require("mongoose");

// Define the schema for user account information and credentials
const userAuthenticationSchema = mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create model for persisting user authentication and account data
const UserAuthModel = mongoose.model("ETrackerAuth", userAuthenticationSchema);

module.exports = UserAuthModel;