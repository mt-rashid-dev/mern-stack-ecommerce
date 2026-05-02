const express = require("express");

const {
  signup,
  signin,
  signout,
  getCurrentUser
} = require("../controllers/auth.controller");
const { verifyToken } = require("../utilities/auth");

const authRoutes = express.Router();

// POST: /api/auth/sign-up
authRoutes.post("/sign-up", signup);

// POST: /api/auth/sign-in
authRoutes.post("/sign-in", signin);

// POST: /api/auth/sign-out
authRoutes.post("/sign-out", signout);

// POST: /api/auth/current-user
authRoutes.post("/current-user", verifyToken, getCurrentUser);

module.exports = authRoutes;