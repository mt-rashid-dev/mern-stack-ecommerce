const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const key = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
    return salt + key;
};

const verifyPassword = (password, hashedPassword) => {};

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: 1000 * 60 * 60 });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60,
    path: "/"
  });
};

const verifyToken = (token, userId) => {};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken
};