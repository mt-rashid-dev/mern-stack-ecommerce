const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model.js");

const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const key = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
    return salt + key;
};

const verifyPassword = (userPassword, storedPassword) => {
  const storedSalt = storedPassword.slice(0, 32);
  const key = crypto.pbkdf2Sync(userPassword, storedSalt, 100000, 64, "sha512").toString("hex");
  const passwordData = storedSalt + key;

  if (passwordData === storedPassword) {
    return true;
  } else {
    return false;
  }
};

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: 1000 * 60 * 60 });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24,
    path: "/"
  });
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({
        message: "Invalid or expired token",
        success: false
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({
        message: "Invalid or expired token",
        success: false
      });
    }

    const user = await User.findOne({ _id: decoded.userId }, { password: 0 });
    if (!user) {
      return res.status(401).send({
        message: "Invalid or expired token",
        success: false
      });
    }

    req.user = user;
    next();
  } catch(error) {
      return res.status(500).send({
        message: "Internal server error",
        success: false
      });
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).send({
        message: "Admin access required",
        success: false
      });
    }

    next();
  } catch (error) {
    console.log(`Error - failed to verify admin: ${error}`);
    res.status(500).send({
      message: "Internal server error",
      success: false
    })
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  verifyAdmin
};