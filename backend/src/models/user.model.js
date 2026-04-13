const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  profilePicture: {
    type: String,
    default: ""
  },
  firstName: {
    type: String,
    required: [true, "First name is required"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  role: {
    type: String,
    default: "user"
  }
});

const User = new model("User", userSchema);
module.exports = User;