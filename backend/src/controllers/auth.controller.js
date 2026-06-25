const fs = require("fs");

const User = require("../models/user.model.js");
const { hashPassword, generateToken, verifyPassword } = require("../utilities/auth.js");

const signup = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({
        message: "Email already exists",
        type: "email-error",
        success: false
      });
    }

    const hashedPassword = hashPassword(password);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    generateToken(newUser._id, res);

    res.status(201).send({
      message: "Sign Up Successful",
      success: true,
      profilePicture: newUser.profilePicture,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role
    });
  } catch (error) {
    console.log(`Error - failed to complete sign up process: ${error}`);
    res.status(500).send({
      message: "Internal server error",
      success: false
    });
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log(user);
      return res.status(400).send({
        message: "Invalid email or password",
        type: "credentials-error",
        success: false
      });
    }

    const isPasswordValid = verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Invalid email or password",
        type: "credentials-error",
        success: false
      });
    }

    generateToken(user._id, res);

    res.status(200).send({
      message: "Sign In Successful",
      success: true,
      profilePicture: user.profilePicture,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    next(error);
  }
};

const signout = (req, res, next) => {
  try {
    res.cookie("token", { maxAge: 0 });
    res.status(200).send({ message: "Sign Out Successful", success: true });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).send({
      profilePicture: user.profilePicture,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    next(error);
  }
};

const editProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const editedFirstName = req.body.editedFirstName;
    const editedLastName = req.body.editedLastName;
    const editedEmail = req.body.editedEmail;
    const previousPicture = req.user.profilePicture;
    let newPicture = "";

    if (req.file) {
      newPicture = req.file.path;
      fs.unlink(previousPicture, (error) => {
        if (error) {
          console.log(`Error - failed to delete profile picture: ${error}`);
        } else {
          console.log(`${previousPicture} was deleted`);
        }
      });
    } else {
      newPicture = previousPicture;
    }

    await User.findOneAndUpdate({ _id: userId }, { $set: {
      profilePicture: newPicture,
      firstName: editedFirstName,
      lastName: editedLastName,
      email: editedEmail
    } });

    const user = await User.findOne({ _id: userId }, { password: 0 });

    res.status(200).send({
      user,
      message: "Profile updated successfully",
      success: true
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to update profile",
      success: false,
      error: error.message
    });
  }
};

module.exports = { signup, signin, signout, getCurrentUser, editProfile };