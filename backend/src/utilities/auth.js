const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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
    maxAge: 1000 * 60 * 60,
    path: "/"
  });
};

const protectRoute = (token, userId) => {};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  protectRoute
};