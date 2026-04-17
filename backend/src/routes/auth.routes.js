const express = require("express");

const {
  signup,
  signin,
  signout
} = require("../controllers/auth.controller");

const authRoutes = express.Router();

// POST: /api/auth/sign-up
authRoutes.post("/sign-up", signup);

// POST: /api/auth/sign-in
authRoutes.post("/sign-in", signin);

// POST: /api/auth/sign-out
authRoutes.post("/sign-out", signout);


module.exports = authRoutes;