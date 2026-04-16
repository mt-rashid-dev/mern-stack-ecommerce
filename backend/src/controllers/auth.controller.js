const User = require("../models/user.model.js");
const { hashPassword, generateToken } = require("../utilities/auth.js");

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
      message: "Sign-Up Successful",
      success: true,
      profilePicture: newUser.profilePicture,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role
    });
  } catch (error) {
    next(error);
  }
};

const singin = () => {};

const signout = (req, res, next) => {
  try {
    res.cookie("token", { maxAge: 0 });
    res.status(200).send({ message: "Sign-Out Successful", success: true });
  } catch (error) {
    next(error);
  }
  console.log(req.cookies);
  
};

module.exports = { signup, signout };