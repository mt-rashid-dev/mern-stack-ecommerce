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
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
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

module.exports = { signup, signin, signout };