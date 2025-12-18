const UserAuthModel = require("../Model/AuthModel");
const express = require("express");
const authenticationRouter = express.Router();

// Handle user registration request
authenticationRouter.post("/SignUp", async (req, res) => {
  const { Email } = req.body;
  const existingUser = await UserAuthModel.findOne({ Email: Email });
  if (existingUser) {
    res.send("Email Already Exists");
  } else {
    const newUser = new UserAuthModel(req.body);
    const savedUser = await newUser.save();
    res.send("Your account has been created")
  }
});

// Handle user login request
authenticationRouter.post("/SignIn", async (req, res) => {
  const { Email, Password } = req.body;
  const authenticatedUser = await UserAuthModel.findOne({
    $and: [{ Email: Email }, { Password: Password }],
  });
  if (authenticatedUser) {
    res.send({ userId: authenticatedUser._id, Username: authenticatedUser.Username });
  } else {
    res.send("User not founded");
  }
});

module.exports = authenticationRouter;
